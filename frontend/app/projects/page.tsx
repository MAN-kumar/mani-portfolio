import React, { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { LoadingState } from "@/components/feedback/LoadingState";
import { FadeIn } from "@/components/motion/FadeIn";
import { getProjects } from "@/lib/data";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      <FadeIn>
        <SectionHeading
          eyebrow="PROJECTS & CASE STUDIES"
          title="Featured Work & Architecture"
          description="Filter and search across full-stack web applications, machine learning tools, and engineering prototypes."
        />
      </FadeIn>

      <Suspense fallback={<LoadingState count={6} />}>
        <ProjectsContainer initialProjects={projects} />
      </Suspense>
    </PageContainer>
  );
}
