import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiAcademicCap, HiViewGrid, HiBookOpen, HiUsers,
  HiDocumentText, HiLogout, HiMenuAlt3, HiLightningBolt,
  HiBell,
} from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const adminLinks = [
  { to: "/admin", icon: HiViewGrid, label: "Dashboard" },
  { to: "/admin/courses", icon: HiBookOpen, label: "Courses" },
  { to: "/admin/users", icon: HiUsers, label: "Users" },
  { to: "/admin/quizzes", icon: HiDocumentText, label: "Quizzes" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-950/95 backdrop-blur-xl border-r border-violet-500/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-violet-500/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-glow-violet">
              <HiAcademicCap className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg gradient-text block leading-none">
                LearnFlow
              </span>
              <span className="text-xs text-violet-400 font-medium">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs text-slate-600 font-semibold uppercase tracking-widest px-4 mb-3">
            Management
          </p>
          {adminLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={label}
              to={to}
              end={to === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-violet-500/15 text-violet-400 border border-violet-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`
              }
            >
              <Icon className="text-lg" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-violet-500/10">
          <div className="flex items-center gap-2 glass rounded-xl p-3 mb-3 border-violet-500/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{user?.name}</p>
              <div className="flex items-center gap-1">
                <HiLightningBolt className="text-violet-400 text-xs" />
                <span className="text-xs text-violet-400">Administrator</span>
              </div>
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

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-navy-900/80 backdrop-blur-xl border-b border-violet-500/10 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden glass rounded-lg p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <HiMenuAlt3 className="text-slate-200" />
            </button>
            <div className="hidden sm:flex items-center gap-2 glass rounded-full px-3 py-1.5">
              <HiLightningBolt className="text-violet-400 text-sm" />
              <span className="text-xs text-violet-400 font-medium">Admin Mode</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="glass rounded-lg p-2">
              <HiBell className="text-slate-300" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
