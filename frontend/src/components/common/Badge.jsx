import React from "react";

const variants = {
  free:      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  plus:      "bg-indigo-500/20  text-indigo-400  border-indigo-500/30",
  premium:   "bg-violet-500/20  text-violet-400  border-violet-500/30",
  success:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  warning:   "bg-amber-500/20   text-amber-400   border-amber-500/30",
  error:     "bg-red-500/20     text-red-400     border-red-500/30",
  info:      "bg-indigo-500/20  text-indigo-400  border-indigo-500/30",
};

const Badge = ({ label, variant = "info", className = "" }) => (
  <span className={`inline-flex items-center border text-xs px-2 py-0.5 rounded-full font-medium ${variants[variant.toLowerCase()] || variants.info} ${className}`}>
    {label}
  </span>
);

export default Badge;
