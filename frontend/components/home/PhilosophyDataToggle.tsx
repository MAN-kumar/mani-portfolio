"use client";

import React, { useState } from "react";
import { Profile } from "@/types/portfolio";
import { Terminal, Layout, Code2 } from "lucide-react";

export interface PhilosophyDataToggleProps {
  profile: Profile;
}

export const PhilosophyDataToggle: React.FC<PhilosophyDataToggleProps> = ({
  profile,
}) => {
  const [mode, setMode] = useState<"visual" | "data">("visual");

  const jsonRepresentation = JSON.stringify(
    {
      entity: "Profile",
      owner: profile.name,
      headline: profile.headline,
      philosophy: profile.philosophy,
      currentFocus: profile.currentFocus,
      stackCapabilities: profile.whatIBuild,
      availability: profile.availability,
    },
    null,
    2
  );

  return (
    <div className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
      {/* Header Bar with Toggle Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-sky-400" />
          <span className="font-mono text-xs font-semibold text-slate-300 tracking-wider uppercase">
            PARADIGM MANIFESTO // DEMO
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              mode === "visual"
                ? "bg-sky-500/15 text-sky-300 font-semibold border border-sky-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layout className="h-3.5 w-3.5" />
            <span>[ VISUAL MODE ]</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("data")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              mode === "data"
                ? "bg-sky-500/15 text-sky-300 font-semibold border border-sky-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>[ DATA MODE ]</span>
          </button>
        </div>
      </div>

      {/* Mode Render Content */}
      {mode === "visual" ? (
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
            &quot;{profile.philosophy}&quot;
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            The same underlying structured data entity feeds full-stack page views, project relationships, search indexes, and backend REST APIs without UI duplication.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-sky-300/90 overflow-x-auto">
          <pre>{jsonRepresentation}</pre>
        </div>
      )}
    </div>
  );
};
