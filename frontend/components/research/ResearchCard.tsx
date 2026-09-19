import React from "react";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Database } from "lucide-react";
import { Research } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";

export interface ResearchCardProps {
  research: Research;
  selectedTech?: string | null;
  className?: string;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({
  research,
  selectedTech,
  className = "",
}) => {
  const isHighlighted =
    !selectedTech ||
    research.title.toLowerCase().includes(selectedTech.toLowerCase()) ||
    research.category.toLowerCase().includes(selectedTech.toLowerCase());

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 p-6 shadow-sm ${
        !isHighlighted ? "opacity-30 scale-[0.99]" : "opacity-100"
      } ${className}`}
    >
      <div>
        {/* Research Log Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              LOGBOOK {"//"} {research.category} {"//"} {research.year}
            </span>
          </div>
          <Badge variant="accent" size="sm">
            {research.status}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
          <Link href={`/research/${research.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {research.title}
          </Link>
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {research.abstract}
        </p>
      </div>

      <div>
        {/* Dataset & Metric Metadata Panel */}
        {research.dataset && (
          <div className="mb-4 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Database className="h-3.5 w-3.5 text-sky-400" />
              <span>{research.dataset.name}</span>
            </div>
            <div className="text-slate-400 text-[11px] flex justify-between">
              <span>{research.dataset.featureCount} Features</span>
              <span>Format: {research.dataset.format}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono font-medium text-slate-300 group-hover:text-amber-400 transition-colors">
          <span>READ EXPERIMENTAL NOTE</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
