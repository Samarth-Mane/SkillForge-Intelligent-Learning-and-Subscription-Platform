import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiAcademicCap, HiViewGrid, HiBookOpen, HiClock,
  HiDocumentText, HiLogout, HiMenuAlt3, HiX, HiUser,
  HiBell,
} from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const sidebarLinks = [
  { to: "/dashboard", icon: HiViewGrid, label: "Overview" },
  { to: "/courses", icon: HiBookOpen, label: "Browse Courses" },
  { to: "/dashboard", icon: HiClock, label: "Continue Learning" },
  { to: "/dashboard", icon: HiDocumentText, label: "Certificates" },
  { to: "/dashboard", icon: HiUser, label: "Profile" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-950/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-sm">
              <HiAcademicCap className="text-white" />
            </div>
            <span className="font-display font-bold text-lg gradient-text">LearnFlow</span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`
              }
            >
              <Icon className="text-lg" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/5">
          <div className="glass rounded-xl p-3 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <HiLogout />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-navy-900/80 backdrop-blur-xl border-b border-white/5 px-6 h-16 flex items-center justify-between">
          <button
            className="lg:hidden glass rounded-lg p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenuAlt3 className="text-slate-200" />
          </button>

          <div className="flex-1 lg:flex-none" />

          <div className="flex items-center gap-3">
            <button className="glass rounded-lg p-2 relative">
              <HiBell className="text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
