import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
        // Optionally refresh from API
		const response = await authService.getProfile();
		const profile = response.data.data;
		setUser(profile);
		localStorage.setItem("user", JSON.stringify(profile));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);

    const authData = response.data.data;

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));

    setUser(authData.user);
    setIsAuthenticated(true);

    return authData;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);

    const authData = response.data.data;

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));

    setUser(authData.user);
    setIsAuthenticated(true);

    return authData;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const isAdmin = () => user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
