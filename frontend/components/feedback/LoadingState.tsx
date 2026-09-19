import React from "react";

export const LoadingState: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between h-64"
        >
          <div>
            <div className="h-4 bg-slate-800 rounded w-1/3 mb-4" />
            <div className="h-6 bg-slate-800 rounded w-3/4 mb-3" />
            <div className="h-4 bg-slate-800/80 rounded w-full mb-2" />
            <div className="h-4 bg-slate-800/80 rounded w-2/3" />
          </div>
          <div className="h-8 bg-slate-800/60 rounded w-1/2 mt-6" />
        </div>
      ))}
    </div>
  );
};
