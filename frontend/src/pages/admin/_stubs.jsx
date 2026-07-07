import React from "react";
import { HiBookOpen } from "react-icons/hi";

const ComingSoon = ({ title }) => (
  <div className="text-center py-20">
    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
      <HiBookOpen className="text-violet-400 text-3xl" />
    </div>
    <h2 className="font-display text-2xl font-bold text-slate-200 mb-2">{title}</h2>
    <p className="text-slate-400">This admin module is coming in the next build phase.</p>
  </div>
);

export const AdminCourses = () => <ComingSoon title="Course Management" />;
export const AdminUsers = () => <ComingSoon title="User Management" />;
export const AdminQuizzes = () => <ComingSoon title="Quiz Management" />;
