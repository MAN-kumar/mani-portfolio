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

export async function generateMetadata({ params }: ResearchPageProps) {
  const { slug } = await params;
  const research = await getResearchBySlug(slug);

  if (!research) {
    return {
      title: "Research Record Not Found | Mani Kumar",
    };
  }

  return {
    title: `${research.title} | Research Case Study`,
    description: research.abstract,
  };
}

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const research = await getResearchBySlug(slug);

  if (!research) {
    notFound();
  }

  const allResearch = await getResearch();
  const allProjects = await getProjects();

  const currentIndex = allResearch.findIndex((r) => r.slug === research.slug);
  const prevResearch = currentIndex > 0 ? allResearch[currentIndex - 1] : undefined;
  const nextResearch =
    currentIndex >= 0 && currentIndex < allResearch.length - 1
      ? allResearch[currentIndex + 1]
      : undefined;

  const relatedProjectsData = allProjects.filter((p) =>
    research.relatedProjects?.includes(p.slug)
  );

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <ResearchDetailView
        research={research}
        relatedProjectsData={relatedProjectsData}
        prevResearch={prevResearch}
        nextResearch={nextResearch}
      />
    </PageContainer>
  );
}
