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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Resolve related projects & research data
  const allProjects = await getProjects();
  const allResearch = await getResearch();

  const relatedProjectsData = allProjects.filter((p) =>
    project.relatedProjects?.includes(p.slug)
  );

  const relatedResearchData = allResearch.filter((r) =>
    project.relatedResearch?.includes(r.slug)
  );

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      <ProjectDetailView
        project={project}
        relatedProjectsData={relatedProjectsData}
        relatedResearchData={relatedResearchData}
      />
    </PageContainer>
  );
}
