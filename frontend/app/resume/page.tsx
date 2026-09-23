import React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Card } from "@/components/ui/Card";
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
import { Download, ArrowUpRight, GraduationCap, Briefcase, Award, FileText, Code } from "lucide-react";

export const metadata = {
  title: "Resume",
  description:
    "Professional resume, experience, education, skills, and portfolio case studies of Mani Kumar.",
};

export default async function ResumePage() {
  const profile = await getProfile();
  const experiences = await getExperiences();
  const education = await getEducation();
  const skills = await getSkills();
  const projects = await getProjects();
  const achievements = await getAchievements();

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Header & Download Action */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <SectionHeading
            eyebrow="RESUME // TECHNICAL SPECIFICATION"
            title={`${profile.name} — Resume`}
            description={profile.headline}
            className="mb-0"
          />
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

      {/* Professional Summary */}
      <FadeIn className="my-10">
        <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
            {"// PROFESSIONAL SUMMARY"}
          </span>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            {profile.longBio || profile.shortBio}
          </p>
        </Card>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <div className="my-12 space-y-6">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Briefcase className="h-4 w-4" />
              <span>WORK EXPERIENCE & INTERNSHIPS</span>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <FadeIn key={exp.id}>
                <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[var(--border)]">
                    <div>
                      <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold uppercase tracking-wider block">
                        {exp.company}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{exp.role}</h3>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((t) => (
                        <TechnologyTag key={t} name={t} size="sm" />
                      ))}
                    </div>
                  )}
                </Card>
              </FadeIn>
            ))}
          </div>

          <Divider variant="subtle" />
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="my-12 space-y-6">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" />
              <span>ACADEMIC BACKGROUND</span>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {education.map((edu) => (
              <FadeIn key={edu.id}>
                <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-[var(--border)]">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{edu.degree}</h3>
                    <span className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                      {edu.startYear} — {edu.endYear || "Present"}
                    </span>
                  </div>
                  <h4 className="text-xs font-mono text-[var(--text-secondary)]">
                    {edu.institution} {"//"} {edu.field}
                  </h4>
                  {edu.description && (
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
                      {edu.description}
                    </p>
                  )}
                </Card>
              </FadeIn>
            ))}
          </div>

          <Divider variant="subtle" />
        </div>
      )}

      {/* Technical Skills Matrix */}
      {skills && skills.length > 0 && (
        <div className="my-12 space-y-6">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Code className="h-4 w-4" />
              <span>TECHNICAL CAPABILITIES & TOOLING</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card key={skill.slug} className="p-5 rounded-2xl glass-elevated border border-[var(--border)] space-y-2">
                <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold uppercase block">
                  {skill.category}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{skill.name}</h3>
                {skill.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]">
                    {skill.technologies.map((tech) => (
                      <TechnologyTag key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Divider variant="subtle" />
        </div>
      )}

      {/* Key Portfolio Projects Highlights */}
      {projects && projects.length > 0 && (
        <div className="my-12 space-y-6">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <span>KEY PORTFOLIO CASE STUDIES</span>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {projects.map((proj) => (
              <Card
                key={proj.id}
                className="p-5 rounded-2xl glass-elevated border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold uppercase">
                    {proj.category}
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{proj.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl leading-relaxed">
                    {proj.shortDescription}
                  </p>
                </div>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[var(--accent-primary)] hover:underline shrink-0"
                >
                  <span>INSPECT SPEC</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Honors & Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="my-12 space-y-6">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Award className="h-4 w-4" />
              <span>HONORS & ACHIEVEMENTS</span>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {achievements.map((ach) => (
              <Card key={ach.id} className="p-5 rounded-2xl glass-elevated border border-[var(--border)] space-y-1">
                <span className="font-mono text-xs text-[var(--accent-primary)]">
                  {ach.date} {"//"} {ach.category}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{ach.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{ach.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
