import React from "react";

export interface SceneFallbackProps {
  className?: string;
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({ className = "" }) => {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full min-h-[300px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Decorative ambient visual fallback */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-transparent blur-3xl animate-pulse" />
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-sky-500/20 flex items-center justify-center">
        <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-sky-400/10 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-indigo-500/20 bg-sky-500/5 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
};
