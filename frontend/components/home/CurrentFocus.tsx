import React from "react";
import { Profile } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Cpu, Code, Layers, Sparkles, Activity } from "lucide-react";
import { PhilosophyDataToggle } from "./PhilosophyDataToggle";

export interface CurrentFocusProps {
  profile: Profile;
}

export const CurrentFocus: React.FC<CurrentFocusProps> = ({ profile }) => {
  const icons = [
    <Code key="1" className="h-5 w-5 text-[var(--accent-primary)]" />,
    <Layers key="2" className="h-5 w-5 text-[var(--accent-primary)]" />,
    <Cpu key="3" className="h-5 w-5 text-[var(--accent-primary)]" />,
    <Sparkles key="4" className="h-5 w-5 text-[var(--accent-primary)]" />,
  ];

  return (
    <div className="py-12 sm:py-16 space-y-12 border-t border-[var(--border)]">
      <div>
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <SectionHeading
              eyebrow="01 // CURRENT FOCUS"
              title="Active Engineering & Research"
              description={profile.currentFocus}
              className="mb-0"
            />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-glow)] text-xs font-mono text-[var(--accent-primary)] w-fit self-start sm:self-auto">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>SYSTEM STATUS: ACTIVE</span>
            </div>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {profile.whatIBuild.map((item, idx) => (
            <StaggerItem key={item}>
              <div className="p-5 sm:p-6 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-[var(--accent-glow)]/10 hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="mb-4 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] w-fit group-hover:border-[var(--accent-glow)] transition-colors">
                    {icons[idx % icons.length]}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    MODULE 0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {item}
                  </h3>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--border)]/60 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>SPECIFICATION</span>
                  <span className="text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    ACTIVE
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <FadeIn delay={0.3}>
        <PhilosophyDataToggle profile={profile} />
      </FadeIn>
    </div>
  );
};
