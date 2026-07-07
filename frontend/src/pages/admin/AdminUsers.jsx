import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiSearch, HiX, HiUsers, HiPencil, HiTrash,
  HiFilter, HiBan, HiCheckCircle,
} from "react-icons/hi";
import { adminService } from "../../services/courseService";
import { formatDate } from "../../utils/helpers";
import toast from "react-hot-toast";

const MOCK_USERS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ["Alex Johnson", "Maria Garcia", "James Kim", "Priya Nair", "Tom Chen", "Emma Brown", "David Lee", "Nina Patel", "Chris Wang", "Sarah Davis"][i % 10],
  email: [`user${i + 1}@example.com`],
  role: i === 0 ? "ADMIN" : "USER",
  plan: ["FREE", "PLUS", "PREMIUM", "PLUS", "FREE"][i % 5],
  status: i % 7 === 0 ? "BANNED" : "ACTIVE",
  joinedAt: `2024-${String(Math.floor(Math.random() * 11) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
  coursesEnrolled: Math.floor(Math.random() * 10),
}));

const planBadge = (plan) => ({ FREE: "badge-free", PLUS: "badge-plus", PREMIUM: "badge-premium" }[plan] || "badge-free");

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    adminService.getUsers()
      .then(({ data }) => setUsers(data?.content || data || []))
      .catch(() => setUsers(MOCK_USERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name?.toLowerCase().includes(search.toLowerCase()) || String(u.email)?.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "ALL" || u.plan === planFilter;
    return matchSearch && matchPlan;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === "ACTIVE" ? "BANNED" : "ACTIVE" } : u));
    toast.success("User status updated");
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-100 mb-1">User Management</h1>
          <p className="text-slate-400 text-sm">{users.length.toLocaleString()} registered users</p>
        </div>
        <div className="flex items-center gap-3">
          {["ALL", "FREE", "PLUS", "PREMIUM"].map(p => (
            <button key={p} onClick={() => { setPlanFilter(p); setPage(1); }} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${planFilter === p ? "bg-indigo-500 text-white" : "glass text-slate-400 hover:text-slate-200"}`}>{p}</button>
          ))}
        </div>
      </motion.div>

      <div className="relative max-w-md mb-6">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or email..." className="input-field pl-11" />
        {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"><HiX /></button>}
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 bg-navy-800/40">
                {["User", "Email", "Role", "Plan", "Courses", "Joined", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left p-4 text-slate-500 font-medium text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(10).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-white/3">
                    {Array(8).fill(0).map((_, j) => <td key={j} className="p-4"><div className="skeleton h-4 w-full rounded" /></td>)}
                  </tr>
                ))
                : paginated.length === 0
                  ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <HiUsers className="text-slate-600 text-4xl mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">No users match your search.</p>
                      </td>
                    </tr>
                  )
                  : paginated.map((u, i) => (
                    <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-white/3 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="text-slate-200 font-medium text-sm">{u.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">{Array.isArray(u.email) ? u.email[0] : u.email}</td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.role === "ADMIN" ? "bg-violet-500/20 text-violet-400 border border-violet-500/30" : "bg-slate-500/20 text-slate-400"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4"><span className={planBadge(u.plan)}>{u.plan}</span></td>
                      <td className="p-4 text-slate-400 text-sm">{u.coursesEnrolled}</td>
                      <td className="p-4 text-slate-500 text-xs">{formatDate(u.joinedAt)}</td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${u.status === "ACTIVE" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleStatus(u.id)}
                            title={u.status === "ACTIVE" ? "Ban user" : "Unban user"}
                            className={`p-1.5 rounded-lg transition-all ${u.status === "ACTIVE" ? "text-slate-400 hover:text-red-400 hover:bg-red-500/10" : "text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"}`}
                          >
                            {u.status === "ACTIVE" ? <HiBan className="text-sm" /> : <HiCheckCircle className="text-sm" />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <p className="text-slate-500 text-xs">Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg glass text-slate-400 text-xs disabled:opacity-40 hover:text-slate-200 transition-colors">← Prev</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <button key={i + 1} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${page === i + 1 ? "bg-indigo-500 text-white" : "glass text-slate-400 hover:text-slate-200"}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg glass text-slate-400 text-xs disabled:opacity-40 hover:text-slate-200 transition-colors">Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
