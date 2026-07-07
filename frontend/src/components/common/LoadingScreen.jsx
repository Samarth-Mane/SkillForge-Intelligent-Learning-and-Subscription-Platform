import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-navy-900 flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-6">
      {/* Animated logo mark */}
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 opacity-20" />
      </motion.div>

      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {["L", "e", "a", "r", "n", "F", "l", "o", "w"].map((letter, i) => (
          <motion.span
            key={i}
            className="text-xl font-display font-bold gradient-text"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </div>
);

export default LoadingScreen;
