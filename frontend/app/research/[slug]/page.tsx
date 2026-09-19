import React from "react";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ResearchDetailView } from "@/components/research/ResearchDetailView";
import { getResearchBySlug, getResearch, getProjects } from "@/lib/data";

export interface ResearchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const researchList = await getResearch();
  return researchList.map((r) => ({ slug: r.slug }));
}

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const research = await getResearchBySlug(slug);

  if (!research) {
    notFound();
  }

  const allProjects = await getProjects();
  const relatedProjectsData = allProjects.filter((p) =>
    research.relatedProjects?.includes(p.slug)
  );

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      <ResearchDetailView
        research={research}
        relatedProjectsData={relatedProjectsData}
      />
    </PageContainer>
  );
}
