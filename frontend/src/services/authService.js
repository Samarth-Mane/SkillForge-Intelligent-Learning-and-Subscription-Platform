import api from "./api";

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
  getProfile: () => api.get("/auth/me"),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
