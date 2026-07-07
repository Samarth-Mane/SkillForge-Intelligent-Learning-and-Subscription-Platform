import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiCode,
  HiDatabase,
  HiCloud,
  HiShieldCheck,
  HiChip,
  HiDesktopComputer,
  HiDeviceMobile,
  HiCog,
} from "react-icons/hi";

const categories = [
  { icon: HiCode, label: "Web Development", courses: 284, color: "from-blue-500 to-indigo-600" },
  { icon: HiDatabase, label: "Data Science", courses: 196, color: "from-emerald-500 to-teal-600" },
  { icon: HiCloud, label: "Cloud & DevOps", courses: 148, color: "from-cyan-500 to-blue-600" },
  { icon: HiShieldCheck, label: "Cybersecurity", courses: 112, color: "from-red-500 to-rose-600" },
  { icon: HiChip, label: "AI & ML", courses: 203, color: "from-violet-500 to-purple-600" },
  { icon: HiDesktopComputer, label: "System Design", courses: 87, color: "from-amber-500 to-orange-600" },
  { icon: HiDeviceMobile, label: "Mobile Dev", courses: 134, color: "from-pink-500 to-rose-600" },
  { icon: HiCog, label: "Backend", courses: 167, color: "from-indigo-500 to-violet-600" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CategoriesSection = () => (
  <section className="section-padding">
    <div className="container-max">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
          Browse by Topic
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
          Explore Our Categories
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          From beginner to expert — find the right course in your field of interest.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {categories.map(({ icon: Icon, label, courses, color }) => (
          <motion.div key={label} variants={item}>
            <Link
              to={`/courses?category=${encodeURIComponent(label)}`}
              className="card-hover flex flex-col items-center text-center p-6 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-slate-200 text-sm mb-1 group-hover:text-white transition-colors">
                {label}
              </h3>
              <p className="text-slate-500 text-xs">{courses} courses</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CategoriesSection;
