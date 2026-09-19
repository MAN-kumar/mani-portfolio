import React from "react";
import { Skill } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

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
    <div className="py-12 sm:py-16">
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
            className="self-start sm:self-auto shrink-0"
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
              <div
                key={skill.slug}
                className={`p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between ${
                  !isHighlighted ? "opacity-30 scale-[0.99]" : "opacity-100"
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase block mb-1">
                    {skill.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">
                    {skill.name}
                  </h3>
                  {skill.description && (
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>

                {skill.technologies && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
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
              </div>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
};
