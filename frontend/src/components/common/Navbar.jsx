import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenuAlt3,
  HiX,
  HiAcademicCap,
  HiChevronDown,
  HiLogout,
  HiUser,
  HiViewGrid,
  HiLightningBolt,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },	
  { to: "/subscription", label: "Pricing" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/90 backdrop-blur-xl border-b border-white/5 shadow-glass"
          : "bg-transparent"
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
              <HiAcademicCap className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              LearnFlow
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-400 bg-indigo-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-violet-500/10"
                  >
                    <HiLightningBolt />
                    Admin
                  </Link>
                )}

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 glass rounded-xl px-3 py-2 hover:border-indigo-500/30 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-slate-200 max-w-[100px] truncate">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                    <HiChevronDown
                      className={`text-slate-400 text-sm transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 glass rounded-xl border border-white/10 shadow-glass overflow-hidden"
                      >
                        <div className="p-3 border-b border-white/5">
                          <p className="text-sm font-medium text-slate-200 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="p-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <HiViewGrid className="text-indigo-400" />
                            Dashboard
                          </Link>
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <HiUser className="text-indigo-400" />
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <HiLogout />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden glass rounded-lg p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <HiX className="text-xl text-slate-200" />
            ) : (
              <HiMenuAlt3 className="text-xl text-slate-200" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="py-4 px-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-indigo-400 bg-indigo-500/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="pt-2 border-t border-white/5 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="block btn-secondary text-sm text-center"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileOpen(false);
                        }}
                        className="w-full text-sm text-red-400 py-2 hover:text-red-300"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileOpen(false)}
                        className="block btn-secondary text-sm text-center"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileOpen(false)}
                        className="block btn-primary text-sm text-center"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
