import React from "react";
import Link from "next/link";
import { JourneyItem } from "@/types/portfolio";
import { ArrowUpRight } from "lucide-react";

export interface TimelineProps {
  items: JourneyItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = "" }) => {
  return (
    <div className={`relative border-l border-[var(--border)] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 ${className}`}>
      {items.map((item, idx) => (
        <div key={item.id} className="relative group">
          {/* Milestone node marker */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-300" />

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
            <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold tracking-tight">
              {item.date} {"//"} LOG {idx + 1} {"//"} {item.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
            {item.title}
          </h3>
          <h4 className="text-xs font-mono tracking-tight text-[var(--text-muted)] mb-2">{item.subtitle}</h4>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 max-w-2xl">
            {item.description}
          </p>

          {item.relatedProjectSlug && (
            <Link
              href={`/projects/${item.relatedProjectSlug}`}
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[var(--accent-primary)] hover:underline transition-all"
            >
              <span>INSPECT CASE SPEC</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
