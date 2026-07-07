import React from "react";

const Spinner = ({ size = "md", className = "" }) => {
  const sizes = { sm: "w-4 h-4 border", md: "w-8 h-8 border-2", lg: "w-12 h-12 border-2" };
  return (
    <div className={`${sizes[size]} border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin ${className}`} />
  );
};

export const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export default Spinner;
