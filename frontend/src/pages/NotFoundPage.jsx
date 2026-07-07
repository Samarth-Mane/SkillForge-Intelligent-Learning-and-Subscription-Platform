import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiHome, HiArrowLeft } from "react-icons/hi";

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center p-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md"
    >
      <div className="relative mb-8">
        <p className="font-display font-extrabold text-[8rem] leading-none text-transparent bg-gradient-to-br from-indigo-500/20 to-violet-500/20 bg-clip-text select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display font-extrabold text-[8rem] leading-none gradient-text opacity-10 blur-sm select-none">
            404
          </p>
        </div>
      </div>

      <h1 className="font-display text-2xl font-bold text-slate-100 mb-3">Page not found</h1>
      <p className="text-slate-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-3 justify-center">
        <button onClick={() => window.history.back()} className="btn-secondary flex items-center gap-2">
          <HiArrowLeft /> Go back
        </button>
        <Link to="/" className="btn-primary flex items-center gap-2">
          <HiHome /> Home
        </Link>
      </div>
    </motion.div>
  </div>
);

export default NotFoundPage;
