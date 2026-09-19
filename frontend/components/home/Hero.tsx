import React from "react";
import { Profile } from "@/types/portfolio";
import { LinkButton } from "@/components/ui/LinkButton";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";
import { Magnetic } from "@/components/motion/Magnetic";
import { DynamicHeroSceneWrapper } from "@/components/3d/DynamicHeroSceneWrapper";
import { ArrowRight, Terminal, Mail } from "lucide-react";

export interface HeroProps {
  profile: Profile;
  selectedTech?: string | null;
  onSelectTech?: (tech: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <div className="relative pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Structural Editorial Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Asymmetrical Typography & Content */}
        <div className="lg:col-span-8 z-10 space-y-6">
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-semibold text-sky-400 tracking-widest uppercase">
                v1.0.4 // SYSTEM ARCHITECTURE
              </span>
              <span className="text-slate-700">•</span>
              <Badge variant="accent" size="sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                {profile.availability}
              </Badge>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.08]">
              Architecting <span className="text-sky-400 font-mono font-bold">Intelligent Products</span> & Full-Stack Web Systems.
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              {profile.shortBio}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic strength={5}>
                <LinkButton
                  href="/projects"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore Work
                </LinkButton>
              </Magnetic>

              <Magnetic strength={5}>
                <LinkButton
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  leftIcon={<Mail className="h-4 w-4" />}
                >
                  Get In Touch
                </LinkButton>
              </Magnetic>
            </div>
          </FadeIn>

          {/* Terminal / Metadata Line */}
          <FadeIn direction="up" delay={0.5} className="pt-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono max-w-xl text-slate-300">
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80 text-slate-500 text-[11px]">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-sky-400" />
                  <span>mani@system:~</span>
                </div>
                <span>NODE_ENV: PRODUCTION</span>
              </div>
              <p className="text-slate-400">
                <span className="text-sky-400">$</span> echo $PHILOSOPHY
              </p>
              <p className="text-slate-100 font-semibold mt-1">
                &quot;{profile.philosophy}&quot;
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Interactive 3D Content Relationship Graph */}
        <div className="lg:col-span-4 hidden sm:flex flex-col items-center justify-center relative min-h-[340px] lg:min-h-[400px]">
          <div className="w-full h-full p-2 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>CONTENT RELATIONSHIP GRAPH</span>
              <span className="text-sky-400">3D INTERACTIVE</span>
            </div>
            <DynamicHeroSceneWrapper className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
