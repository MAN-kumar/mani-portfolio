import React, { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { LoadingState } from "@/components/feedback/LoadingState";
import { FadeIn } from "@/components/motion/FadeIn";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Projects",
  description:
    "Interactive directory of engineering projects, full-stack applications, and machine learning systems built by Mani Kumar.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <FadeIn>
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="01 // PROJECT DIRECTORY"
            title="Selected Systems, Experiments & Engineering Work"
            description="Filter and search across full-stack applications, machine learning architectures, and engineering prototypes."
          />
        </div>
      </FadeIn>

      <Suspense fallback={<LoadingState count={6} />}>
        <ProjectsContainer initialProjects={projects} />
      </Suspense>
    </PageContainer>
  );
}
