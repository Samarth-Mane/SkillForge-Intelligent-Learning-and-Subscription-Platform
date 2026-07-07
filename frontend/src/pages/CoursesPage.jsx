import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiFilter, HiAdjustments, HiX } from "react-icons/hi";
import CourseCard from "../components/course/CourseCard";
import { courseService, categoryService } from "../services/courseService";

const SUBSCRIPTION_TYPES = ["ALL", "FREE", "PLUS", "PREMIUM"];
const DIFFICULTY_LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "az", label: "A → Z" },
];

const MOCK_COURSES = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: [
    "Complete React 18 — From Zero to Hero",
    "Spring Boot 3 with Microservices",
    "Python for Data Science & ML",
    "AWS Solutions Architect",
    "Full Stack MERN Development",
    "Docker & Kubernetes Mastery",
    "TypeScript Deep Dive",
    "System Design Interview Prep",
  ][i % 8],
  instructor: ["Sarah Chen", "James Wilson", "Dr. Priya Sharma", "Michael Torres", "Alex Kim", "Nina Patel", "David Lee", "Emma Brown"][i % 8],
  category: ["Web Development", "Backend", "AI & ML", "Cloud & DevOps", "Web Development", "Cloud & DevOps", "Web Development", "System Design"][i % 8],
  duration: ["32h 45m", "48h 10m", "55h 30m", "28h 15m", "40h 0m", "22h 30m", "18h 45m", "35h 0m"][i % 8],
  subscriptionType: ["FREE", "PLUS", "PREMIUM", "PLUS", "FREE", "PREMIUM", "PLUS", "PREMIUM"][i % 8],
  difficulty: ["Beginner", "Intermediate", "Advanced", "Intermediate", "Beginner", "Advanced", "Intermediate", "Advanced"][i % 8],
  rating: +(4.5 + Math.random() * 0.5).toFixed(1),
  studentsCount: Math.floor(5000 + Math.random() * 30000),
}));

const SkeletonCard = () => (
  <div className="card overflow-hidden">
    <div className="skeleton aspect-video -mx-6 -mt-6 mb-4" />
    <div className="space-y-3">
      <div className="skeleton h-3 w-20 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-2/3 rounded" />
      <div className="skeleton h-3 w-24 rounded" />
    </div>
  </div>
);

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const subscription = searchParams.get("subscription") || "ALL";
  const difficulty = searchParams.get("difficulty") || "All Levels";
  const sort = searchParams.get("sort") || "newest";
  const hasFilters =
    search ||
    category ||
    subscription !== "ALL" ||
    difficulty !== "All Levels";
  const CATEGORY_MAP = {
    "Web Development": 1,
    "Backend": 2,
    "AI & ML": 3,
    "Cloud & DevOps": 4,
    "Cybersecurity": 5,
    "Data Science": 6,
    "Mobile Dev": 7,
    "System Design": 8,
  };
  console.log(searchParams.toString());
  const page = parseInt(searchParams.get("page") || "0");
  
  const setParam = (key, val) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set(key, val); else next.delete(key);
    if (key !== "page") next.set("page", "1");
    setSearchParams(next);
  };

  const loadCourses = useCallback(() => {
    setLoading(true);
	courseService.getAll({
	  search,
	  categoryId: CATEGORY_MAP[category],
	  subscription:
	    subscription !== "ALL" ? subscription : undefined,
	  difficulty:
	    difficulty !== "All Levels" ? difficulty : undefined,
	  sort,
	  page,
	  size: 12,})
	  .then(({ data }) => {
	      console.log("Courses Response:", data);
	      console.log("Content:", data.content);

	      setCourses(data.content || []);
	      setTotalPages(data.totalPages || 1);
	  })
      .catch(() => {
        let filtered = [...MOCK_COURSES];
        if (search) filtered = filtered.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));
        if (category) filtered = filtered.filter(c => c.category === category);
        if (subscription !== "ALL") filtered = filtered.filter(c => c.subscriptionType === subscription);
        if (difficulty !== "All Levels") filtered = filtered.filter(c => c.difficulty === difficulty);
        const start = (page - 1) * 12;
        setCourses(filtered.slice(start, start + 12));
        setTotalPages(Math.ceil(filtered.length / 12));
      })
      .finally(() => setLoading(false));
  }, [search, category, subscription, difficulty, sort, page]);

  useEffect(() => {
    categoryService.getAll()
      .then(({ data }) => {
        console.log("Categories:", data);
        setCategories(data || []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  const activeFilters = [
    category && { key: "category", label: category },
    subscription !== "ALL" && { key: "subscription", label: subscription },
    difficulty !== "All Levels" && { key: "difficulty", label: difficulty },
  ].filter(Boolean);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-navy-950/60 border-b border-white/5 py-10">
        <div className="container-max px-6">
          <h1 className="font-display text-3xl font-bold text-slate-100 mb-2">Course Catalog</h1>
          <p className="text-slate-400 mb-6">Explore 1,200+ expert-led courses across all skill levels.</p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setParam("search", e.target.value)}
                placeholder="Search courses, topics, instructors..."
                className="input-field pl-11"
              />
              {search && (
                <button onClick={() => setParam("search", "")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                  <HiX />
                </button>
              )}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`btn-secondary flex items-center gap-2 ${showFilters ? "border-indigo-500/50 text-indigo-400" : ""}`}>
              <HiAdjustments /> Filters {activeFilters.length > 0 && <span className="bg-indigo-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFilters.length}</span>}
            </button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/5">
                  {/* Category */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Category</label>
                    <select value={category} onChange={e => setParam("category", e.target.value)} className="input-field text-sm py-2.5">
                      <option value="">All Categories</option>
                      {["Web Development", "Backend", "AI & ML", "Cloud & DevOps", "Cybersecurity", "Data Science", "Mobile Dev", "System Design"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  {/* Subscription */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Plan</label>
                    <div className="flex gap-1 flex-wrap">
                      {SUBSCRIPTION_TYPES.map(t => (
                        <button key={t} onClick={() => setParam("subscription", t === "ALL" ? "" : t)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${(t === "ALL" && subscription === "ALL") || subscription === t ? "bg-indigo-500 text-white" : "glass text-slate-400 hover:text-slate-200"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  {/* Difficulty */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Level</label>
                    <select value={difficulty} onChange={e => setParam("difficulty", e.target.value)} className="input-field text-sm py-2.5">
                      {DIFFICULTY_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  {/* Sort */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Sort By</label>
                    <select value={sort} onChange={e => setParam("sort", e.target.value)} className="input-field text-sm py-2.5">
                      {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-3">
              {activeFilters.map(f => (
                <span key={f.key} className="flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-slate-300 border-indigo-500/20">
                  {f.label}
                  <button onClick={() => setParam(f.key, "")} className="hover:text-red-400 transition-colors"><HiX /></button>
                </span>
              ))}
              <button onClick={() => setSearchParams({})} className="text-xs text-indigo-400 hover:text-indigo-300 px-2">Clear all</button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="container-max px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">{loading ? "Loading..." : `Showing results`}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {loading
            ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : courses.length > 0
              ? courses.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <CourseCard course={c} />
                  </motion.div>
                ))
              : (
                <div className="col-span-full text-center py-20">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="font-display text-xl font-bold text-slate-200 mb-2">No courses found</h3>
                  <p className="text-slate-400 text-sm">Try adjusting your filters or search terms.</p>
                </div>
              )
          }
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setParam("page", String(page - 1))} disabled={page === 1} className="btn-secondary px-4 py-2 text-sm disabled:opacity-40">← Prev</button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const p = i + 1;
              return (
                <button key={p} onClick={() => setParam("page", String(p))} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${p === page ? "bg-indigo-500 text-white shadow-glow-sm" : "glass text-slate-400 hover:text-slate-200"}`}>{p}</button>
              );
            })}
            <button onClick={() => setParam("page", String(page + 1))} disabled={page === totalPages} className="btn-secondary px-4 py-2 text-sm disabled:opacity-40">Next →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
