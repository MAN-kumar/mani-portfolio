import React from "react";
import { Skill } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight, Wrench } from "lucide-react";

export interface SkillsPreviewProps {
  skills: Skill[];
  selectedTech?: string | null;
  onSelectTech?: (tech: string) => void;
}

export const SkillsPreview: React.FC<SkillsPreviewProps> = ({
  skills,
  selectedTech,
  onSelectTech,
}) => {
  return (
    <div className="py-12 sm:py-16 border-t border-[var(--border)]">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <SectionHeading
            eyebrow="03 // SKILLS & CAPABILITIES"
            title="Technical Foundation"
            description="Core engineering capabilities paired with modern production toolchains and frameworks."
            className="mb-0"
          />
          <LinkButton
            href="/about"
            variant="ghost"
            size="md"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="self-start sm:self-auto shrink-0 text-[var(--accent-primary)] hover:bg-[var(--accent-soft)]"
          >
            Full Skill Overview
          </LinkButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => {
            const isHighlighted =
              !selectedTech ||
              skill.technologies?.some(
                (t) => t.toLowerCase() === selectedTech.toLowerCase()
              ) ||
              skill.name.toLowerCase().includes(selectedTech.toLowerCase());

            return (
              <Card
                key={skill.slug}
                hoverEffect
                className={`p-6 flex flex-col justify-between ${
                  !isHighlighted ? "opacity-30 scale-[0.99]" : "opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border)]">
                    <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <Wrench className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                      {skill.category}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                      CAPABILITY MAP
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    {skill.name}
                  </h3>
                  {skill.description && (
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>

                {skill.technologies && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
                    {skill.technologies.map((tech) => {
                      const isTechActive =
                        selectedTech?.toLowerCase() === tech.toLowerCase();
                      return (
                        <TechnologyTag
                          key={tech}
                          name={tech}
                          size="sm"
                          active={isTechActive}
                          interactive
                          onClick={() => onSelectTech?.(tech)}
                        />
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
};
