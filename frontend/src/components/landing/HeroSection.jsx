import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiPlay,
  HiSearch,
  HiSparkles,
  HiTrendingUp,
  HiAcademicCap,
  HiStar,
} from "react-icons/hi";

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "1,200+", label: "Expert Courses" },
  { value: "98%", label: "Completion Rate" },
  { value: "4.9★", label: "Avg. Rating" },
];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/courses?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-600/8 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-max section-padding relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border-indigo-500/30"
          >
            <HiSparkles className="text-indigo-400 text-sm" />
            <span className="text-sm text-slate-300 font-medium">
              New: AI-powered learning paths are here
            </span>
            <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/20 px-2 py-0.5 rounded-full">
              New
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-balance"
          >
            Master Skills That{" "}
            <span className="gradient-text">Elevate</span>{" "}
            Your Career
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Expert-led video courses, hands-on projects, and industry-ready
            certificates — all on one platform built for ambitious professionals.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <form
              onSubmit={handleSearch}
              className="flex gap-2 max-w-xl mx-auto"
            >
              <div className="relative flex-1">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, topics, skills..."
                  className="input-field pl-11 h-13"
                />
              </div>
              <button type="submit" className="btn-primary px-6 whitespace-nowrap">
                Search
              </button>
            </form>
            <p className="text-slate-600 text-sm mt-3">
              Popular:{" "}
              {["React", "Spring Boot", "Python", "Machine Learning"].map(
                (tag, i) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/courses?search=${tag}`)}
                    className="text-slate-400 hover:text-indigo-400 transition-colors mr-2"
                  >
                    {tag}
                    {i < 3 ? "," : ""}
                  </button>
                )
              )}
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2">
              <HiAcademicCap />
              Start Learning Free
            </Link>
            <Link to="/courses" className="btn-secondary flex items-center gap-2">
              <HiPlay />
              Browse Courses
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="glass rounded-2xl p-4 text-center">
                <p className="font-display font-bold text-2xl gradient-text-indigo">
                  {value}
                </p>
                <p className="text-slate-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating course cards decoration */}
        <div className="hidden lg:block">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-8 glass rounded-2xl p-4 max-w-[200px] border-indigo-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <HiTrendingUp className="text-indigo-400 text-sm" />
              </div>
              <div>
                <p className="text-xs text-slate-300 font-medium">React 18</p>
                <p className="text-xs text-slate-500">Advanced</p>
              </div>
            </div>
            <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
            </div>
            <p className="text-xs text-slate-500 mt-1">75% complete</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 left-8 glass rounded-2xl p-4 max-w-[180px] border-violet-500/20"
          >
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <HiStar key={s} className="text-yellow-400 text-xs" />
              ))}
            </div>
            <p className="text-xs text-slate-300 font-medium">
              "Best platform for devs!"
            </p>
            <p className="text-xs text-slate-500 mt-1">— Alex R.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
