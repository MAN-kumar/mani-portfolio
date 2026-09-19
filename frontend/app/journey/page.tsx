import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/journey/Timeline";
import { FadeIn } from "@/components/motion/FadeIn";
import { getJourney } from "@/lib/data";

export default async function JourneyPage() {
  const journeyItems = await getJourney();

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      <FadeIn>
        <SectionHeading
          eyebrow="JOURNEY & TIMELINE"
          title="Milestones & Evolution"
          description="Chronological view of technical releases, architecture decisions, and research progress."
        />
      </FadeIn>

      <FadeIn delay={0.2} className="mt-12">
        <Timeline items={journeyItems} />
      </FadeIn>
    </PageContainer>
  );
}
