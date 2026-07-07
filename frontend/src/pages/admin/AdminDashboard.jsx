import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiUsers, HiBookOpen, HiCreditCard, HiAcademicCap,
  HiCurrencyDollar, HiChartBar, HiPencil, HiPlus,
} from "react-icons/hi";
import { adminService } from "../../services/courseService";
import { formatDate } from "../../utils/helpers";

const MOCK_STATS = {
  totalUsers: 50248, totalCourses: 1247, activeSubscriptions: 18320,
  monthlyRevenue: 183200, certificatesIssued: 9450, completionRate: 78,
};
const MOCK_RECENT_USERS = [
  { id: 1, name: "Alex Johnson", email: "alex@email.com", plan: "PLUS", joinedAt: "2024-11-20" },
  { id: 2, name: "Maria Garcia", email: "maria@email.com", plan: "PREMIUM", joinedAt: "2024-11-19" },
  { id: 3, name: "James Kim", email: "james@email.com", plan: "FREE", joinedAt: "2024-11-19" },
  { id: 4, name: "Priya Nair", email: "priya@email.com", plan: "PLUS", joinedAt: "2024-11-18" },
];
const MOCK_TOP_COURSES = [
  { id: 1, title: "Complete React 18", students: 18420, rating: 4.9, revenue: 53418 },
  { id: 2, title: "Spring Boot Masterclass", students: 12350, rating: 4.8, revenue: 72965 },
  { id: 3, title: "Python for ML", students: 34200, rating: 4.9, revenue: 0 },
  { id: 4, title: "AWS Solutions Architect", students: 9870, rating: 4.7, revenue: 28623 },
];

const planBadge = (plan) => ({ FREE: "badge-free", PLUS: "badge-plus", PREMIUM: "badge-premium" }[plan] || "badge-free");

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats()
      .then(({ data }) => { setStats(data.stats || MOCK_STATS); setRecentUsers(data.recentUsers || MOCK_RECENT_USERS); setTopCourses(data.topCourses || MOCK_TOP_COURSES); })
      .catch(() => { setStats(MOCK_STATS); setRecentUsers(MOCK_RECENT_USERS); setTopCourses(MOCK_TOP_COURSES); })
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { icon: HiUsers, label: "Total Users", value: stats.totalUsers?.toLocaleString(), change: "+12%", color: "text-indigo-400 bg-indigo-500/10" },
    { icon: HiBookOpen, label: "Total Courses", value: stats.totalCourses?.toLocaleString(), change: "+5%", color: "text-emerald-400 bg-emerald-500/10" },
    { icon: HiCreditCard, label: "Active Subscriptions", value: stats.activeSubscriptions?.toLocaleString(), change: "+18%", color: "text-cyan-400 bg-cyan-500/10" },
    { icon: HiCurrencyDollar, label: "Monthly Revenue", value: `$${(stats.monthlyRevenue || 0).toLocaleString()}`, change: "+23%", color: "text-violet-400 bg-violet-500/10" },
    { icon: HiAcademicCap, label: "Certificates Issued", value: stats.certificatesIssued?.toLocaleString(), change: "+8%", color: "text-yellow-400 bg-yellow-500/10" },
    { icon: HiChartBar, label: "Completion Rate", value: `${stats.completionRate}%`, change: "+2%", color: "text-pink-400 bg-pink-500/10" },
  ] : [];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-100 mb-1">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">Platform analytics and management overview.</p>
        </div>
        <Link to="/admin/courses" className="btn-primary flex items-center gap-2 text-sm"><HiPlus /> Add Course</Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {loading
          ? Array(6).fill(0).map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)
          : statCards.map(({ icon: Icon, label, value, change, color }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}><Icon className="text-xl" /></div>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded-full">{change}</span>
              </div>
              <p className="font-display font-bold text-2xl text-slate-100 mb-1">{value}</p>
              <p className="text-slate-500 text-sm">{label}</p>
            </motion.div>
          ))
        }
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-slate-100">Recent Registrations</h2>
            <Link to="/admin/users" className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{u.name[0].toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium truncate">{u.name}</p>
                  <p className="text-slate-500 text-xs truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={planBadge(u.plan)}>{u.plan}</span>
                  <span className="text-slate-600 text-xs hidden sm:block">{formatDate(u.joinedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-slate-100">Top Courses</h2>
            <Link to="/admin/courses" className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">Manage →</Link>
          </div>
          <div className="space-y-4">
            {topCourses.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-navy-700 flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium truncate">{c.title}</p>
                  <p className="text-slate-500 text-xs">{c.students?.toLocaleString()} students · ⭐ {c.rating}</p>
                </div>
                <span className="text-emerald-400 text-xs font-medium hidden sm:block">{c.revenue > 0 ? `$${c.revenue.toLocaleString()}` : "Free"}</span>
                <Link to="/admin/courses" className="text-slate-400 hover:text-indigo-400 transition-colors p-1"><HiPencil className="text-sm" /></Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6">
        <h2 className="font-display font-semibold text-slate-100 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: HiPlus, label: "Add New Course", desc: "Create a new course", to: "/admin/courses", color: "text-indigo-400 bg-indigo-500/10" },
            { icon: HiUsers, label: "Manage Users", desc: "View and manage users", to: "/admin/users", color: "text-emerald-400 bg-emerald-500/10" },
            { icon: HiBookOpen, label: "Manage Courses", desc: "Edit course catalog", to: "/admin/courses", color: "text-cyan-400 bg-cyan-500/10" },
            { icon: HiAcademicCap, label: "Create Quiz", desc: "Add quiz to a course", to: "/admin/quizzes", color: "text-violet-400 bg-violet-500/10" },
          ].map(({ icon: Icon, label, desc, to, color }) => (
            <Link key={label} to={to} className="card-hover flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}><Icon /></div>
              <div><p className="text-slate-200 font-medium text-sm">{label}</p><p className="text-slate-500 text-xs">{desc}</p></div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
