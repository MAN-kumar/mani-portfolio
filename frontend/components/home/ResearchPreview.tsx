import React from "react";
import { Research } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchCard } from "@/components/research/ResearchCard";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

export interface ResearchPreviewProps {
  researchList: Research[];
  selectedTech?: string | null;
}

export const ResearchPreview: React.FC<ResearchPreviewProps> = ({
  researchList,
  selectedTech,
}) => {
  return (
    <div className="py-12 sm:py-16 border-t border-[var(--border)]">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <SectionHeading
            eyebrow="04 // RESEARCH LAB"
            title="Experiments & Methodologies"
            description="Investigating machine learning explainability, dataset feature selection, and algorithmic evaluation."
            className="mb-0"
          />
          <LinkButton
            href="/research"
            variant="secondary"
            size="md"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="self-start sm:self-auto shrink-0"
          >
            Explore Research Lab
          </LinkButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchList.map((item) => (
            <ResearchCard key={item.id} research={item} selectedTech={selectedTech} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
