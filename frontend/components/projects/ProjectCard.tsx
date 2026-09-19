import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";

export interface ProjectCardProps {
  project: Project;
  index?: number;
  selectedTech?: string | null;
  onSelectTech?: (tech: string) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  selectedTech,
  onSelectTech,
  className = "",
}) => {
  const formattedIndex =
    index !== undefined ? (index + 1).toString().padStart(2, "0") : undefined;

  const isHighlighted =
    !selectedTech ||
    project.technologies.some(
      (t) => t.toLowerCase() === selectedTech.toLowerCase()
    );

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 p-6 shadow-sm ${
        !isHighlighted ? "opacity-30 scale-[0.99]" : "opacity-100"
      } ${className}`}
    >
      <div>
        {/* Engineering Spec Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            {formattedIndex && (
              <span className="font-mono text-xs font-bold text-sky-400">
                {formattedIndex} {"//"}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-500">{project.year}</span>
            <Badge
              variant={project.status === "Completed" ? "success" : "accent"}
              size="sm"
            >
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-sky-300 transition-colors mb-2">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
          {project.shortDescription}
        </p>
      </div>

      <div>
        {/* Technology Tags with Highlighting Callback */}
        <div className="flex flex-wrap gap-1.5 mb-6 z-20 relative">
          {project.technologies.map((tech) => {
            const isTechActive =
              selectedTech?.toLowerCase() === tech.toLowerCase();
            return (
              <TechnologyTag
                key={tech}
                name={tech}
                size="sm"
                active={isTechActive}
                interactive
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTech?.(tech);
                }}
              />
            );
          })}
        </div>

        {/* Action Link CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono font-medium text-slate-300 group-hover:text-sky-400 transition-colors">
          <span>SPECIFICATION & CASE STUDY</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
