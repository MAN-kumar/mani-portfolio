import React from "react";

export const LoadingState: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = "",
}) => {
  return (
    <div
      aria-live="polite"
      role="status"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      <span className="sr-only">Loading content...</span>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6 flex flex-col justify-between h-64"
        >
          <div>
            <div className="h-4 bg-[var(--surface-hover)] rounded w-1/3 mb-4" />
            <div className="h-6 bg-[var(--surface-hover)] rounded w-3/4 mb-3" />
            <div className="h-4 bg-[var(--surface-hover)]/80 rounded w-full mb-2" />
            <div className="h-4 bg-[var(--surface-hover)]/80 rounded w-2/3" />
          </div>
          <div className="h-8 bg-[var(--surface-hover)]/60 rounded w-1/2 mt-6" />
        </div>
      ))}
    </div>
  );
};
