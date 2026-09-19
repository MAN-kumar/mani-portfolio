import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchCard } from "@/components/research/ResearchCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { getResearch } from "@/lib/data";

export default async function ResearchPage() {
  const researchList = await getResearch();

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      <FadeIn>
        <SectionHeading
          eyebrow="RESEARCH LAB"
          title="Experiments & Methodologies"
          description="Investigating machine learning explainability, model feature attribution, and algorithmic benchmarks."
        />
      </FadeIn>

      <FadeIn delay={0.2} className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchList.map((item) => (
            <ResearchCard key={item.id} research={item} />
          ))}
        </div>
      </FadeIn>
    </PageContainer>
  );
}
