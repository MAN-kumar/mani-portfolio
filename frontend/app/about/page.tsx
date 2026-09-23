import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  getProfile,
  getSkills,
  getEducation,
  getExperiences,
  getAchievements,
} from "@/lib/data";
import {
  ArrowRight,
  Terminal,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Layers,
  Cpu,
  Sparkles,
  MapPin,
  Mail,
  FileText,
} from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Computer Science student, full-stack developer, and AI/ML enthusiast profile, skills, education, and experience.",
};

export default async function AboutPage() {
  const profile = await getProfile();
  const skills = await getSkills();
  const education = await getEducation();
  const experiences = await getExperiences();
  const achievements = await getAchievements();

  const focusIcons = [
    <Code key="1" className="h-5 w-5 text-[var(--accent-primary)]" />,
    <Layers key="2" className="h-5 w-5 text-[var(--accent-primary)]" />,
    <Cpu key="3" className="h-5 w-5 text-[var(--accent-primary)]" />,
    <Sparkles key="4" className="h-5 w-5 text-[var(--accent-primary)]" />,
  ];

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Introduction Hero Section */}
      <FadeIn>
        <div className="max-w-3xl space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" size="md">
              04 // ABOUT PROFILE
            </Badge>
            <Badge variant="accent" size="sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
              {profile.availability}
            </Badge>
            {profile.location && (
              <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-secondary)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                {profile.location}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <span className="font-mono text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider block">
              {profile.name}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1]">
              {profile.headline}
            </h1>
          </div>

          <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed">
            {profile.longBio || profile.shortBio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <LinkButton
              href="/contact"
              variant="primary"
              size="md"
              leftIcon={<Mail className="h-4 w-4" />}
            >
              Get In Touch
            </LinkButton>
            <LinkButton
              href="/resume"
              variant="secondary"
              size="md"
              leftIcon={<FileText className="h-4 w-4" />}
            >
              View Resume
            </LinkButton>
          </div>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Core Philosophy Card */}
      {profile.philosophy && (
        <FadeIn className="my-12">
          <Card className="p-8 sm:p-12 rounded-2xl glass-elevated border border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase block">
                CORE ARCHITECTURAL PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono leading-snug">
                &quot;{profile.philosophy}&quot;
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Content is modeled as structured data entities, allowing the presentation layer to remain a predictable, reusable system across views and APIs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--accent-primary)] shrink-0">
              <Terminal className="h-10 w-10" />
            </div>
          </Card>
        </FadeIn>
      )}

      <Divider variant="subtle" />

      {/* Current Engineering Focus */}
      <div className="my-16 space-y-8">
        <FadeIn>
          <SectionHeading
            eyebrow="CURRENT DIRECTION"
            title="Engineering Focus & Building Scope"
            description={profile.currentFocus}
          />
        </FadeIn>

        {profile.whatIBuild && profile.whatIBuild.length > 0 && (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.whatIBuild.map((item, idx) => (
              <StaggerItem key={item}>
                <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all h-full flex flex-col justify-between">
                  <div className="mb-4 p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] w-fit">
                    {focusIcons[idx % focusIcons.length]}
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">{item}</h3>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <Divider variant="subtle" />

      {/* Work Experience Section */}
      {experiences && experiences.length > 0 && (
        <div className="my-16 space-y-8">
          <FadeIn>
            <SectionHeading
              eyebrow="PROFESSIONAL EXPERIENCE"
              title="Engineering Work & Internships"
              description="Verified practical experience in full-stack development and backend systems."
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <Card
                  key={exp.id}
                  className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[var(--border)]">
                    <div>
                      <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <Briefcase className="h-3.5 w-3.5" />
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
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <TechnologyTag key={tech} name={tech} size="sm" />
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </FadeIn>

          <Divider variant="subtle" />
        </div>
      )}

      {/* Technical Skills Matrix */}
      <div className="my-16 space-y-8">
        <FadeIn>
          <SectionHeading
            eyebrow="TECHNICAL SKILLS"
            title="Capabilities & Tooling Stack"
            description="Verified technical capabilities, core languages, and framework proficiencies."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <Card
                key={skill.slug}
                className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase block">
                    {skill.category}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{skill.name}</h3>
                  {skill.description && (
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>

                {skill.technologies && skill.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                    {skill.technologies.map((tech) => (
                      <TechnologyTag key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </FadeIn>
      </div>

      <Divider variant="subtle" />

      {/* Academic Background */}
      {education && education.length > 0 && (
        <div className="my-16 space-y-8">
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
                <Card
                  key={edu.id}
                  className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[var(--border)]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[var(--accent-primary)] font-mono text-xs font-bold uppercase tracking-wider">
                        <GraduationCap className="h-4 w-4" />
                        <span>{edu.degree}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{edu.institution}</h3>
                      <h4 className="text-xs font-mono text-[var(--text-secondary)]">{edu.field}</h4>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                      {edu.startYear} — {edu.endYear || "Present"}
                    </span>
                  </div>

                  {edu.description && (
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                  {edu.grade && (
                    <div className="font-mono text-xs text-[var(--accent-primary)] font-semibold pt-1">
                      Grade / Status: {edu.grade}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </FadeIn>

          <Divider variant="subtle" />
        </div>
      )}

      {/* Achievements & Honors */}
      {achievements && achievements.length > 0 && (
        <div className="my-16 space-y-8">
          <FadeIn>
            <SectionHeading
              eyebrow="HONORS & RECOGNITION"
              title="Verified Achievements"
              description="Notable academic and technical recognitions."
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((ach) => (
                <Card
                  key={ach.id}
                  className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[var(--accent-primary)] font-bold flex items-center gap-1.5">
                      <Award className="h-4 w-4" />
                      {ach.category}
                    </span>
                    <span className="text-[var(--text-muted)]">{ach.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{ach.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {ach.description}
                  </p>
                </Card>
              ))}
            </div>
          </FadeIn>

          <Divider variant="subtle" />
        </div>
      )}

      {/* Cross-Navigation Footer */}
      <FadeIn className="my-16">
        <Card className="p-8 sm:p-12 rounded-2xl glass-elevated border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Interested in collaborating or discussing a role?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Explore engineering projects, experimental research logbooks, or send a direct message.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <LinkButton
              href="/projects"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Browse Projects
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="md">
              Get In Touch
            </LinkButton>
          </div>
        </Card>
      </FadeIn>
    </PageContainer>
  );
}
