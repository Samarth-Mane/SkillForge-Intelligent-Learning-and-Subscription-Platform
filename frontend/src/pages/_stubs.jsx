// Stub pages — to be fully built in subsequent modules

import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const ComingSoon = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
    <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
      <span className="text-4xl">🚀</span>
    </div>
    <h1 className="font-display text-3xl font-bold gradient-text mb-3">{title}</h1>
    <p className="text-slate-400 mb-8 max-w-md">
      This module is being built. Check back soon or continue to the next step.
    </p>
    <Link to="/" className="btn-secondary flex items-center gap-2">
      <HiArrowLeft /> Back to Home
    </Link>
  </div>
);

export const CoursesPage = () => <ComingSoon title="Course Catalog" />;
export const CourseDetailPage = () => <ComingSoon title="Course Details" />;
export const LearningPage = () => <ComingSoon title="Learning Player" />;
export const QuizPage = () => <ComingSoon title="Quiz Module" />;
export const CertificatePage = () => <ComingSoon title="Certificate" />;
export const SubscriptionPage = () => <ComingSoon title="Subscription Plans" />;
