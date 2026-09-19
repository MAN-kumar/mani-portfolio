import React from "react";
import { JourneyItem } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/journey/Timeline";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

export interface JourneyPreviewProps {
  items: JourneyItem[];
}

export const JourneyPreview: React.FC<JourneyPreviewProps> = ({ items }) => {
  return (
    <div className="py-12 sm:py-16">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <SectionHeading
            eyebrow="05 // JOURNEY & MILESTONES"
            title="Professional Evolution"
            description="Chronological progress through major milestones, architectural releases, and research explorations."
            className="mb-0"
          />
          <LinkButton
            href="/journey"
            variant="ghost"
            size="md"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="self-start sm:self-auto shrink-0"
          >
            Full Journey Timeline
          </LinkButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Timeline items={items.slice(0, 3)} />
      </FadeIn>
    </div>
  );
};
