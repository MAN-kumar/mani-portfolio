import React, { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchContainer } from "@/components/research/ResearchContainer";
import { LoadingState } from "@/components/feedback/LoadingState";
import { FadeIn } from "@/components/motion/FadeIn";
import { getResearch } from "@/lib/data";

export const metadata = {
  title: "Research",
  description:
    "Experimental logbook, applied machine learning research, and dataset benchmarks by Mani Kumar.",
};

export default async function ResearchPage() {
  const researchList = await getResearch();

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <FadeIn>
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="02 // RESEARCH LOGBOOK"
            title="Experiments, Datasets & Methodologies"
            description="Investigating machine learning explainability, URL-based security classification, and feature attribution benchmarks."
          />
        </div>
      </FadeIn>

      <Suspense fallback={<LoadingState count={4} />}>
        <ResearchContainer initialResearch={researchList} />
      </Suspense>
    </PageContainer>
  );
}
