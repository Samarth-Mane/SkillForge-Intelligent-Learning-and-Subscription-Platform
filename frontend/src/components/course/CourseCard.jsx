import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiClock, HiStar, HiPlay, HiUsers } from "react-icons/hi";

const badgeMap = {
  FREE: "badge-free",
  PLUS: "badge-plus",
  PREMIUM: "badge-premium",
};

const difficultyColor = {
  Beginner: "text-emerald-400",
  Intermediate: "text-amber-400",
  Advanced: "text-red-400",
};

const CourseCard = ({ course }) => {
  const {
    id,
    thumbnail,
    title,
    instructor,
    category,
    duration,
    subscriptionType = "FREE",
    difficulty = "Beginner",
    rating = 4.8,
    studentsCount = 0,
    price,
  } = course || {};

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group cursor-pointer overflow-hidden border border-white/8 hover:border-indigo-500/30 hover:shadow-glass transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative -mx-6 -mt-6 mb-4 overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-navy-700 to-navy-800 relative">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <HiPlay className="text-indigo-400 text-3xl ml-1" />
              </div>
            </div>
          )}
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 transform">
              <HiPlay className="text-white text-xl ml-0.5" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={badgeMap[subscriptionType] || "badge-free"}>
            {subscriptionType}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium ${difficultyColor[difficulty] || "text-slate-400"}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-0">
        {category && (
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-2">
            {category}
          </p>
        )}

        <Link to={`/courses/${id}`}>
          <h3 className="font-semibold text-slate-200 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
            {title || "Untitled Course"}
          </h3>
        </Link>

        <p className="text-slate-500 text-xs mb-3">
          by{" "}
          <span className="text-slate-400">{instructor || "LearnFlow Expert"}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <HiStar className="text-yellow-400 text-sm" />
          <span className="text-yellow-400 text-xs font-semibold">
            {rating.toFixed(1)}
          </span>
          <span className="text-slate-600 text-xs">
            ({studentsCount.toLocaleString()} students)
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <HiClock className="text-xs" />
            <span>{duration || "—"}</span>
          </div>

          <Link
            to={`/courses/${id}`}
            className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-colors"
          >
            View Course →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
