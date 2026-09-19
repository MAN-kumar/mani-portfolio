import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getProfile, getSkills, getEducation } from "@/lib/data";
import { ArrowRight, Terminal, GraduationCap, Code, Layers, Cpu, Sparkles } from "lucide-react";

export default async function AboutPage() {
  const profile = await getProfile();
  const skills = await getSkills();
  const education = await getEducation();

  const focusIcons = [
    <Code key="1" className="h-5 w-5 text-sky-400" />,
    <Layers key="2" className="h-5 w-5 text-sky-400" />,
    <Cpu key="3" className="h-5 w-5 text-sky-400" />,
    <Sparkles key="4" className="h-5 w-5 text-sky-400" />,
  ];

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      {/* Introduction Hero */}
      <FadeIn>
        <div className="max-w-3xl mb-12">
          <Badge variant="accent" size="md" className="mb-4">
            ABOUT MANI
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight mb-6">
            Building Systems Where <span className="text-sky-400">Content Meets Architecture.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-6">
            {profile.longBio}
          </p>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Philosophy Section */}
      <FadeIn className="my-12">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
              CORE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 font-mono">
              &quot;{profile.philosophy}&quot;
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Content is modeled as structured data entities, allowing the UI to remain a predictable, reusable system across views and APIs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 shrink-0">
            <Terminal className="h-10 w-10" />
          </div>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* What I Do / Current Focus */}
      <div className="my-16">
        <FadeIn>
          <SectionHeading
            eyebrow="WHAT I DO"
            title="Current Engineering Focus"
            description={profile.currentFocus}
          />
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {profile.whatIBuild.map((item, idx) => (
            <StaggerItem key={item}>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 transition-all duration-300 h-full flex flex-col justify-between">
                <div className="mb-4 p-3 rounded-lg bg-slate-950 border border-slate-800/60 w-fit">
                  {focusIcons[idx % focusIcons.length]}
                </div>
                <h3 className="text-base font-bold text-slate-100">{item}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Divider variant="subtle" />

      {/* Skills Matrix */}
      <div className="my-16">
        <FadeIn>
          <SectionHeading
            eyebrow="TECHNICAL SKILLS"
            title="Capabilities & Tooling"
            description="Detailed capability breakdown and associated technologies."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.slug}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div>
                  <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase block mb-1">
                    {skill.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100">{skill.name}</h3>
                  {skill.description && (
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>

                {skill.technologies && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
                    {skill.technologies.map((tech) => (
                      <TechnologyTag key={tech} name={tech} size="md" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <Divider variant="subtle" />

      {/* Education */}
      <div className="my-16">
        <FadeIn>
          <SectionHeading
            eyebrow="ACADEMIC BACKGROUND"
            title="Education"
            description="Formal academic foundation in Computer Science & Engineering."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sky-400">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-mono text-xs font-semibold uppercase">
                      {edu.startYear} — {edu.endYear || "Present"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{edu.degree}</h3>
                  <h4 className="text-sm font-mono text-slate-400">{edu.institution} {"//"} {edu.field}</h4>
                  {edu.description && (
                    <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* CTAs */}
      <FadeIn className="my-16">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Interested in working together?</h3>
            <p className="text-sm text-slate-400">Explore case studies or drop a direct message.</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <LinkButton href="/projects" variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Browse Projects
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="md">
              Get In Touch
            </LinkButton>
          </div>
        </div>
      </FadeIn>
    </PageContainer>
  );
}
