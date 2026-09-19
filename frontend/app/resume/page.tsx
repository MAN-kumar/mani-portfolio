import React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  getProfile,
  getExperiences,
  getEducation,
  getSkills,
  getProjects,
  getAchievements,
} from "@/lib/data";
import { Download, ArrowUpRight, GraduationCap, Briefcase, Award } from "lucide-react";

export default async function ResumePage() {
  const profile = await getProfile();
  const experiences = await getExperiences();
  const education = await getEducation();
  const skills = await getSkills();
  const projects = await getProjects();
  const achievements = await getAchievements();

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      {/* Header & Download CTA */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <SectionHeading
              eyebrow="RESUME & EXPERIENCE"
              title={`${profile.name} — Resume`}
              description={profile.headline}
              className="mb-0"
            />
          </div>
          <div className="shrink-0">
            <LinkButton
              href="/resume.pdf"
              variant="primary"
              size="md"
              isExternal
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download PDF Resume
            </LinkButton>
          </div>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Summary */}
      <FadeIn className="my-10">
        <h2 className="text-xs font-mono font-semibold text-sky-400 tracking-wider uppercase mb-2">
          Professional Summary
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {profile.longBio}
        </p>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Experience */}
      <div className="my-12">
        <FadeIn>
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-sky-400" />
            Experience
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <FadeIn key={exp.id}>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                  <span className="font-mono text-xs text-sky-400 font-semibold">
                    {exp.company} {"//"} {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t) => (
                      <TechnologyTag key={t} name={t} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Divider variant="subtle" />

      {/* Education */}
      <div className="my-12">
        <FadeIn>
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-sky-400" />
            Education
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {education.map((edu) => (
            <FadeIn key={edu.id}>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-100">{edu.degree}</h3>
                  <span className="font-mono text-xs text-sky-400 font-semibold">
                    {edu.startYear} — {edu.endYear || "Present"}
                  </span>
                </div>
                <h4 className="text-xs font-mono text-slate-400">{edu.institution} {"//"} {edu.field}</h4>
                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-400">{edu.description}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Divider variant="subtle" />

      {/* Skills Matrix */}
      <div className="my-12">
        <FadeIn>
          <h2 className="text-xl font-bold text-slate-100 mb-6">Skills & Core Tooling</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.slug} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="font-mono text-xs text-sky-400 font-semibold uppercase">{skill.category}</span>
              <h3 className="text-base font-bold text-slate-100">{skill.name}</h3>
              {skill.technologies && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {skill.technologies.map((tech) => (
                    <TechnologyTag key={tech} name={tech} size="sm" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider variant="subtle" />

      {/* Projects Highlights */}
      <div className="my-12">
        <FadeIn>
          <h2 className="text-xl font-bold text-slate-100 mb-6">Key Portfolio Projects</h2>
        </FadeIn>

        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-sky-400 uppercase">{proj.category}</span>
                <h3 className="text-base font-bold text-slate-100">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">{proj.shortDescription}</p>
              </div>
              <Link
                href={`/projects/${proj.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-sky-400 hover:underline shrink-0"
              >
                <span>Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="my-12">
          <FadeIn>
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-sky-400" />
              Achievements
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-mono text-xs text-sky-400">{ach.date} {"//"} {ach.category}</span>
                <h3 className="text-base font-bold text-slate-100 mt-1">{ach.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
