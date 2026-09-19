import React from "react";
import { Profile } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Cpu, Code, Layers, Sparkles } from "lucide-react";

import { PhilosophyDataToggle } from "./PhilosophyDataToggle";

export interface CurrentFocusProps {
  profile: Profile;
}

export const CurrentFocus: React.FC<CurrentFocusProps> = ({ profile }) => {
  const icons = [
    <Code key="1" className="h-5 w-5 text-sky-400" />,
    <Layers key="2" className="h-5 w-5 text-sky-400" />,
    <Cpu key="3" className="h-5 w-5 text-sky-400" />,
    <Sparkles key="4" className="h-5 w-5 text-sky-400" />,
  ];

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div>
        <FadeIn>
          <SectionHeading
            eyebrow="01 // CURRENT FOCUS"
            title="What I'm Building & Researching"
            description={profile.currentFocus}
          />
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {profile.whatIBuild.map((item, idx) => (
            <StaggerItem key={item}>
              <div className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/30 transition-all duration-300 h-full flex flex-col justify-between group">
                <div className="mb-4 p-3 rounded-lg bg-slate-950 border border-slate-800/60 w-fit group-hover:border-sky-500/40 transition-colors">
                  {icons[idx % icons.length]}
                </div>
                <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                  {item}
                </h3>
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
