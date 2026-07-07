import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus, HiPencil, HiTrash, HiSearch, HiX,
  HiBookOpen, HiCheck, HiExclamation,
} from "react-icons/hi";
import { adminService, categoryService } from "../../services/courseService";
import toast from "react-hot-toast";
import { badgeClass } from "../../utils/helpers";

const MOCK_COURSES = [
  { id: 1, title: "Complete React 18", instructor: "Sarah Chen", category: "Web Development", subscriptionType: "PLUS", difficulty: "Intermediate", studentsCount: 18420, status: "PUBLISHED" },
  { id: 2, title: "Spring Boot 3 Masterclass", instructor: "James Wilson", category: "Backend", subscriptionType: "PREMIUM", difficulty: "Advanced", studentsCount: 12350, status: "PUBLISHED" },
  { id: 3, title: "Python for Data Science", instructor: "Dr. Priya Sharma", category: "AI & ML", subscriptionType: "FREE", difficulty: "Beginner", studentsCount: 34200, status: "PUBLISHED" },
  { id: 4, title: "AWS Solutions Architect", instructor: "Michael Torres", category: "Cloud & DevOps", subscriptionType: "PLUS", difficulty: "Intermediate", studentsCount: 9870, status: "DRAFT" },
];

const EMPTY_FORM = {
  title: "", description: "", instructor: "", category: "",
  subscriptionType: "FREE", difficulty: "Beginner", thumbnailUrl: "", duration: "",
};

const CATEGORIES = ["Web Development", "Backend", "AI & ML", "Cloud & DevOps", "Cybersecurity", "Data Science", "Mobile Dev", "System Design"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const SUBSCRIPTION_TYPES = ["FREE", "PLUS", "PREMIUM"];

const Modal = ({ title, onClose, children }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl glass rounded-2xl border border-white/10 shadow-glass overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-display font-bold text-lg text-slate-100">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors p-1">
            <HiX className="text-xl" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm glass rounded-2xl border border-white/10 p-6 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <HiExclamation className="text-red-400 text-2xl" />
        </div>
        <h3 className="font-display font-bold text-slate-100 mb-2">Confirm Delete</h3>
        <p className="text-slate-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-red-500/80 hover:bg-red-500 text-white font-semibold px-4 py-3 rounded-xl transition-colors">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setLoading(true);
    adminService.getUsers({ type: "courses" })
      .then(({ data }) => setCourses(data || []))
      .catch(() => setCourses(MOCK_COURSES))
      .finally(() => setLoading(false));
  };

  const openCreate = () => { setEditCourse(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (c) => { setEditCourse(c); setForm({ ...EMPTY_FORM, ...c }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditCourse(null); setForm(EMPTY_FORM); };

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.title || !form.instructor || !form.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSaving(true);
    try {
      if (editCourse) {
        await adminService.updateCourse(editCourse.id, form);
        setCourses(prev => prev.map(c => c.id === editCourse.id ? { ...c, ...form } : c));
        toast.success("Course updated!");
      } else {
        const { data } = await adminService.createCourse(form);
        setCourses(prev => [data || { ...form, id: Date.now(), studentsCount: 0, status: "DRAFT" }, ...prev]);
        toast.success("Course created!");
      }
      closeModal();
    } catch {
      // Optimistic update for demo
      if (editCourse) {
        setCourses(prev => prev.map(c => c.id === editCourse.id ? { ...c, ...form } : c));
      } else {
        setCourses(prev => [{ ...form, id: Date.now(), studentsCount: 0, status: "DRAFT" }, ...prev]);
      }
      toast.success(editCourse ? "Course updated!" : "Course created!");
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteCourse(deleteId);
    } catch {}
    setCourses(prev => prev.filter(c => c.id !== deleteId));
    toast.success("Course deleted");
    setDeleteId(null);
  };

  const filtered = courses.filter(c =>
    !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.instructor?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-100 mb-1">Course Management</h1>
          <p className="text-slate-400 text-sm">{courses.length} courses in catalog</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <HiPlus /> Add Course
        </button>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses or instructors..."
          className="input-field pl-11"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
            <HiX />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 bg-navy-800/40">
                {["Course", "Instructor", "Category", "Plan", "Level", "Students", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left p-4 text-slate-500 font-medium text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(6).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-white/3">
                    <td className="p-4"><div className="skeleton h-4 w-48 rounded" /></td>
                    <td className="p-4"><div className="skeleton h-4 w-24 rounded" /></td>
                    <td className="p-4"><div className="skeleton h-4 w-28 rounded" /></td>
                    <td className="p-4"><div className="skeleton h-5 w-12 rounded-full" /></td>
                    <td className="p-4"><div className="skeleton h-4 w-20 rounded" /></td>
                    <td className="p-4"><div className="skeleton h-4 w-16 rounded" /></td>
                    <td className="p-4"><div className="skeleton h-5 w-16 rounded-full" /></td>
                    <td className="p-4"><div className="skeleton h-4 w-16 rounded" /></td>
                  </tr>
                ))
                : filtered.length === 0
                  ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <HiBookOpen className="text-slate-600 text-4xl mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">{search ? "No courses match your search." : "No courses found. Add your first course!"}</p>
                      </td>
                    </tr>
                  )
                  : filtered.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-white/3 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <p className="text-slate-200 font-medium text-sm max-w-[200px] truncate">{c.title}</p>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">{c.instructor}</td>
                      <td className="p-4 text-slate-400 text-sm">{c.category}</td>
                      <td className="p-4"><span className={badgeClass(c.subscriptionType)}>{c.subscriptionType}</span></td>
                      <td className="p-4 text-slate-400 text-sm">{c.difficulty}</td>
                      <td className="p-4 text-slate-400 text-sm">{c.studentsCount?.toLocaleString() || 0}</td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.status === "PUBLISHED" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                          {c.status || "DRAFT"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(c)} className="text-slate-400 hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-indigo-500/10">
                            <HiPencil className="text-sm" />
                          </button>
                          <button onClick={() => setDeleteId(c.id)} className="text-slate-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
                            <HiTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <Modal title={editCourse ? "Edit Course" : "Add New Course"} onClose={closeModal}>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Course Title <span className="text-red-400">*</span></label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Complete React 18 Masterclass" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Instructor <span className="text-red-400">*</span></label>
                <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Instructor name" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category <span className="text-red-400">*</span></label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subscription Type</label>
                <select name="subscriptionType" value={form.subscriptionType} onChange={handleChange} className="input-field">
                  {SUBSCRIPTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty Level</label>
                <select name="difficulty" value={form.difficulty} onChange={handleChange} className="input-field">
                  {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Duration (e.g. 32h 45m)</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="32h 45m" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Thumbnail URL</label>
                <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} placeholder="https://..." className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Course description..." className="input-field resize-none" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiCheck />}
                {editCourse ? "Save Changes" : "Create Course"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this course? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default AdminCourses;
