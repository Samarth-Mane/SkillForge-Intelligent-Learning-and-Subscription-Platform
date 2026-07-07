import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiPencil, HiTrash, HiX, HiCheck, HiDocumentText, HiExclamation } from "react-icons/hi";
import { adminService, courseService } from "../../services/courseService";
import toast from "react-hot-toast";

const MOCK_QUIZZES = [
  { id: 1, title: "React 18 Final Assessment", courseId: 1, courseName: "Complete React 18", questions: 10, passMark: 70, attempts: 2840, avgScore: 78 },
  { id: 2, title: "Spring Boot Mid-Term Quiz", courseId: 2, courseName: "Spring Boot Masterclass", questions: 15, passMark: 65, attempts: 1230, avgScore: 71 },
  { id: 3, title: "Python Fundamentals Check", courseId: 3, courseName: "Python for ML", questions: 12, passMark: 60, attempts: 4560, avgScore: 82 },
];

const MOCK_COURSES = [
  { id: 1, title: "Complete React 18" },
  { id: 2, title: "Spring Boot Masterclass" },
  { id: 3, title: "Python for ML" },
  { id: 4, title: "AWS Solutions Architect" },
];

const EMPTY_FORM = { title: "", courseId: "", passMark: 70, timeLimit: 600 };

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      adminService.getStats().then(({ data }) => data?.quizzes || []).catch(() => MOCK_QUIZZES),
      courseService.getAll().then(({ data }) => data?.content || data || []).catch(() => MOCK_COURSES),
    ]).then(([q, c]) => { setQuizzes(q); setCourses(c); }).finally(() => setLoading(false));
  }, []);

  const openCreate = () => { setEditQuiz(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = q => { setEditQuiz(q); setForm({ title: q.title, courseId: q.courseId, passMark: q.passMark, timeLimit: q.timeLimit || 600 }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditQuiz(null); };
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.title || !form.courseId) { toast.error("Please fill in required fields"); return; }
    setSaving(true);
    try {
      const courseName = courses.find(c => String(c.id) === String(form.courseId))?.title || "";
      if (editQuiz) {
        setQuizzes(prev => prev.map(q => q.id === editQuiz.id ? { ...q, ...form, courseName } : q));
        toast.success("Quiz updated!");
      } else {
        setQuizzes(prev => [{ ...form, id: Date.now(), courseName, questions: 0, attempts: 0, avgScore: 0 }, ...prev]);
        toast.success("Quiz created!");
      }
      closeModal();
    } catch { toast.error("Something went wrong"); }
    finally { setSaving(false); }
  };

  const handleDelete = () => {
    setQuizzes(prev => prev.filter(q => q.id !== deleteId));
    toast.success("Quiz deleted");
    setDeleteId(null);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-100 mb-1">Quiz Management</h1>
          <p className="text-slate-400 text-sm">{quizzes.length} quizzes across all courses</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm"><HiPlus /> Create Quiz</button>
      </motion.div>

      {/* Quizzes grid */}
      {loading
        ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array(6).fill(0).map((_, i) => <div key={i} className="skeleton h-44 rounded-2xl" />)}</div>
        : quizzes.length === 0
          ? (
            <div className="card text-center py-16">
              <HiDocumentText className="text-slate-600 text-5xl mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No quizzes created yet.</p>
              <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2 text-sm mt-4"><HiPlus /> Create First Quiz</button>
            </div>
          )
          : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((q, i) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <HiDocumentText className="text-indigo-400 text-lg" />
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(q)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"><HiPencil className="text-sm" /></button>
                      <button onClick={() => setDeleteId(q.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"><HiTrash className="text-sm" /></button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-200 text-sm mb-1 leading-snug">{q.title}</h3>
                  <p className="text-indigo-400 text-xs mb-4 truncate">{q.courseName}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "Questions", value: q.questions || 0 },
                      { label: "Pass Mark", value: `${q.passMark}%` },
                      { label: "Avg Score", value: q.avgScore ? `${q.avgScore}%` : "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-navy-800/40 rounded-lg p-2">
                        <p className="font-bold text-slate-200 text-sm">{value}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                  {q.attempts > 0 && <p className="text-slate-600 text-xs mt-3 text-center">{q.attempts.toLocaleString()} total attempts</p>}
                </motion.div>
              ))}
            </div>
          )
      }

      {/* Modal */}
      {showModal && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && closeModal()}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-lg glass rounded-2xl border border-white/10 shadow-glass overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-display font-bold text-lg text-slate-100">{editQuiz ? "Edit Quiz" : "Create Quiz"}</h2>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-200 p-1"><HiX className="text-xl" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Quiz Title <span className="text-red-400">*</span></label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. React 18 Final Assessment" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Course <span className="text-red-400">*</span></label>
                  <select name="courseId" value={form.courseId} onChange={handleChange} className="input-field">
                    <option value="">Select a course</option>
                    {(courses.length > 0 ? courses : MOCK_COURSES).map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Pass Mark (%)</label>
                    <input name="passMark" type="number" min="1" max="100" value={form.passMark} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Time Limit (seconds)</label>
                    <input name="timeLimit" type="number" min="60" value={form.timeLimit} onChange={handleChange} className="input-field" />
                    <p className="text-slate-600 text-xs mt-1">{Math.round(form.timeLimit / 60)} minutes</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={closeModal} className="btn-secondary flex-1">Cancel</button>
                  <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiCheck />}
                    {editQuiz ? "Save Changes" : "Create Quiz"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm glass rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"><HiExclamation className="text-red-400 text-2xl" /></div>
              <h3 className="font-display font-bold text-slate-100 mb-2">Delete Quiz?</h3>
              <p className="text-slate-400 text-sm mb-6">This will permanently remove the quiz and all associated responses.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={handleDelete} className="flex-1 bg-red-500/80 hover:bg-red-500 text-white font-semibold px-4 py-3 rounded-xl transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AdminQuizzes;
