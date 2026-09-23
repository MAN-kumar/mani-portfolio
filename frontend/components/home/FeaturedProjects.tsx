import React from "react";
import { Project } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

export interface FeaturedProjectsProps {
  projects: Project[];
  selectedTech?: string | null;
  onSelectTech?: (tech: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  selectedTech,
  onSelectTech,
}) => {
  return (
    <div className="py-12 sm:py-16 border-t border-[var(--border)]">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <SectionHeading
            eyebrow="02 // FEATURED WORK"
            title="Projects & Case Studies"
            description="Selected engineering projects demonstrating machine learning architecture, explainable AI pipelines, and full-stack web implementations."
            className="mb-0"
          />
          <LinkButton
            href="/projects"
            variant="secondary"
            size="md"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="self-start sm:self-auto shrink-0"
          >
            View All Projects
          </LinkButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ProjectGrid
          projects={projects}
          selectedTech={selectedTech}
          onSelectTech={onSelectTech}
        />
      </FadeIn>
    </div>
  );
};
