import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({ icon: Icon, title, description, actionLabel, actionTo, onAction }) => (
  <div className="card text-center py-16">
    {Icon && (
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-5">
        <Icon className="text-indigo-400 text-3xl" />
      </div>
    )}
    <h3 className="font-display font-bold text-xl text-slate-200 mb-2">{title}</h3>
    {description && <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">{description}</p>}
    {actionLabel && actionTo && (
      <Link to={actionTo} className="btn-primary inline-flex items-center gap-2 text-sm">{actionLabel}</Link>
    )}
    {actionLabel && onAction && !actionTo && (
      <button onClick={onAction} className="btn-primary inline-flex items-center gap-2 text-sm">{actionLabel}</button>
    )}
  </div>
);

export default EmptyState;
