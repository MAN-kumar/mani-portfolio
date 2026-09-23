import React from "react";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { getProjectBySlug, getProjects, getResearch } from "@/lib/data";

export interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Mani Kumar",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.shortDescription || project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Resolve related projects, research, and adjacent navigation
  const allProjects = await getProjects();
  const allResearch = await getResearch();

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : undefined;

  const relatedProjectsData = allProjects.filter((p) =>
    project.relatedProjects?.includes(p.slug)
  );

  const relatedResearchData = allResearch.filter((r) =>
    project.relatedResearch?.includes(r.slug)
  );

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <ProjectDetailView
        project={project}
        relatedProjectsData={relatedProjectsData}
        relatedResearchData={relatedResearchData}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </PageContainer>
  );
}
