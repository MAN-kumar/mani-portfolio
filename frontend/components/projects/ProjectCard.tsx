import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { Card } from "@/components/ui/Card";

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
    <Card
      hoverEffect
      className={`group relative flex flex-col justify-between p-6 shadow-sm ${
        !isHighlighted ? "opacity-30 scale-[0.99]" : "opacity-100"
      } ${className}`}
    >
      <div>
        {/* Project Media or Technical Blueprint Placeholder */}
        {project.thumbnail ? (
          <div className="relative w-full h-44 mb-5 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="relative w-full h-36 mb-5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4 flex flex-col justify-between overflow-hidden gradient-shimmer group-hover:border-[var(--border-hover)] transition-colors">
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider z-10">
              <span className="flex items-center gap-1.5">
                <FolderGit2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                {project.category}
              </span>
              <span>{project.year}</span>
            </div>
            <div className="font-mono text-xs text-[var(--accent-primary)] font-bold truncate z-10">
              {project.slug}.sys
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[var(--accent-soft)] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Engineering Spec Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            {formattedIndex && (
              <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                {formattedIndex} {"//"}
              </span>
            )}
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[var(--text-muted)]">{project.year}</span>
            <Badge
              variant={project.status === "Completed" ? "success" : "accent"}
              size="sm"
            >
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2 leading-snug">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3 min-h-[4.5rem]">
          {project.shortDescription}
        </p>
      </div>

      <div>
        {/* Technology Tags */}
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
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs font-mono font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
          <span>SPECIFICATION & CASE STUDY</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Card>
  );
};
