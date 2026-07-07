import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight, HiFire } from "react-icons/hi";
import CourseCard from "../course/CourseCard";
import { courseService } from "../../services/courseService";

// Skeleton while loading
const CourseSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="skeleton aspect-video -mx-6 -mt-6 mb-4" />
    <div className="space-y-3">
      <div className="skeleton h-3 w-16 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-3 w-24 rounded" />
      <div className="flex justify-between">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  </div>
);

// Mock data fallback
const MOCK_COURSES = [
  {
    id: 1,
    title: "Complete React 18 — From Zero to Hero",
    instructor: "Sarah Chen",
    category: "Web Development",
    duration: "32h 45m",
    subscriptionType: "PLUS",
    difficulty: "Intermediate",
    rating: 4.9,
    studentsCount: 18420,
  },
  {
    id: 2,
    title: "Spring Boot 3 Masterclass with Microservices",
    instructor: "James Wilson",
    category: "Backend",
    duration: "48h 10m",
    subscriptionType: "PREMIUM",
    difficulty: "Advanced",
    rating: 4.8,
    studentsCount: 12350,
  },
  {
    id: 3,
    title: "Python for Data Science & Machine Learning",
    instructor: "Dr. Priya Sharma",
    category: "AI & ML",
    duration: "55h 30m",
    subscriptionType: "FREE",
    difficulty: "Beginner",
    rating: 4.9,
    studentsCount: 34200,
  },
  {
    id: 4,
    title: "AWS Cloud Practitioner & Solutions Architect",
    instructor: "Michael Torres",
    category: "Cloud & DevOps",
    duration: "28h 15m",
    subscriptionType: "PLUS",
    difficulty: "Intermediate",
    rating: 4.7,
    studentsCount: 9870,
  },
];

const FeaturedCoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService
      .getFeatured()
      .then(({ data }) => setCourses(data?.slice(0, 4) || []))
      .catch(() => setCourses(MOCK_COURSES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-navy-950/30">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HiFire className="text-orange-400 text-lg" />
              <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">
                Trending Now
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">
              Featured Courses
            </h2>
          </div>
          <Link
            to="/courses"
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors text-sm"
          >
            View all courses <HiArrowRight />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <CourseSkeleton key={i} />)
            : courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
