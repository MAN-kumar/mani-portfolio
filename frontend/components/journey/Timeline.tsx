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
    <div className={`relative border-l border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="relative group">
          {/* Milestone marker */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:bg-sky-400 transition-colors" />

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
            <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider">
              {item.date} {"//"} {item.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
            {item.title}
          </h3>
          <h4 className="text-xs font-mono text-slate-400 mb-2">{item.subtitle}</h4>

          <p className="text-sm text-slate-400 leading-relaxed mb-3 max-w-2xl">
            {item.description}
          </p>

          {item.relatedProjectSlug && (
            <Link
              href={`/projects/${item.relatedProjectSlug}`}
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-sky-400 hover:underline"
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
