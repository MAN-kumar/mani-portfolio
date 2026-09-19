import React from "react";
import { Project } from "@/types/portfolio";
import { ProjectCard } from "./ProjectCard";

export interface ProjectGridProps {
  projects: Project[];
  selectedTech?: string | null;
  onSelectTech?: (tech: string) => void;
  className?: string;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  selectedTech,
  onSelectTech,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          selectedTech={selectedTech}
          onSelectTech={onSelectTech}
        />
      ))}
    </div>
  );
};
