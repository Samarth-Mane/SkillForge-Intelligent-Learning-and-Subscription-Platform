import React from "react";

const ProgressBar = ({ percent = 0, label, showLabel = true, height = "h-2", color = "from-indigo-500 to-violet-500", className = "" }) => (
  <div className={className}>
    {showLabel && (
      <div className="flex justify-between items-center mb-1.5">
        {label && <span className="text-xs text-slate-400">{label}</span>}
        <span className="text-xs text-slate-400 ml-auto">{Math.round(percent)}%</span>
      </div>
    )}
    <div className={`${height} bg-navy-700 rounded-full overflow-hidden`}>
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;
