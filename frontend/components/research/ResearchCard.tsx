import React from "react";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Database } from "lucide-react";
import { Research } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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
    <Card
      hoverEffect
      className={`group relative flex flex-col justify-between p-6 shadow-sm ${
        !isHighlighted ? "opacity-30 scale-[0.99]" : "opacity-100"
      } ${className}`}
    >
      <div>
        {/* Research Log Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-[var(--accent-primary)]" />
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
              LOGBOOK {"//"} {research.category} {"//"} {research.year}
            </span>
          </div>
          <Badge variant="accent" size="sm">
            {research.status}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2 leading-snug">
          <Link href={`/research/${research.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {research.title}
          </Link>
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
          {research.abstract}
        </p>
      </div>

      <div>
        {/* Dataset & Metric Metadata Panel */}
        {research.dataset && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold mb-1">
              <Database className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              <span>{research.dataset.name}</span>
            </div>
            <div className="text-[var(--text-secondary)] text-[11px] flex justify-between">
              <span>{research.dataset.featureCount} Features</span>
              <span>Format: {research.dataset.format}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs font-mono font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
          <span>READ EXPERIMENTAL NOTE</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Card>
  );
};
