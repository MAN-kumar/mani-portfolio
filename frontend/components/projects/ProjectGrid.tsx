"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.3, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }
          }
        >
          <ProjectCard
            project={project}
            index={index}
            selectedTech={selectedTech}
            onSelectTech={onSelectTech}
          />
        </motion.div>
      ))}
    </div>
  );
};
