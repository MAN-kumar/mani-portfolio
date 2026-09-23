"use client";

import React from "react";
import Link from "next/link";
import { Project, Research } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { FadeIn } from "@/components/motion/FadeIn";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface ProjectDetailViewProps {
  project: Project;
  relatedProjectsData?: Project[];
  relatedResearchData?: Research[];
  prevProject?: Project;
  nextProject?: Project;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  relatedProjectsData = [],
  relatedResearchData = [],
  prevProject,
  nextProject,
}) => {
  return (
    <article className="space-y-10">
      {/* Top Header & Navigation */}
      <FadeIn>
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO PROJECTS DIRECTORY</span>
          </Link>

          <span className="font-mono text-[11px] text-[var(--accent-primary)] font-bold tracking-widest uppercase hidden sm:inline-block">
            CASE FILE // {project.slug}.sys
          </span>
        </div>
      </FadeIn>

      {/* Case Study Header & Identity */}
      <FadeIn delay={0.1}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={project.status === "Completed" ? "success" : "accent"} size="md">
              {project.status}
            </Badge>
            <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold tracking-wider uppercase">
              {project.category} {"//"} {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            {project.shortDescription || project.description}
          </p>

          {/* External Action Links */}
          <div className="flex flex-wrap gap-4 pt-2">
            {project.links?.github && (
              <LinkButton
                href={project.links.github}
                variant="primary"
                size="md"
                isExternal
                leftIcon={<GithubIcon className="h-4 w-4" />}
              >
                GitHub Repository
              </LinkButton>
            )}
            {project.links?.demo && (
              <LinkButton
                href={project.links.demo}
                variant="secondary"
                size="md"
                isExternal
                rightIcon={<ExternalLink className="h-4 w-4" />}
              >
                Live Demo
              </LinkButton>
            )}
          </div>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Technology Stack Grid */}
      <FadeIn delay={0.15}>
        <Card className="p-5 sm:p-6 rounded-2xl glass-elevated border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
            <Cpu className="h-4 w-4" />
            <span>TECHNOLOGY STACK & INTEGRATIONS</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechnologyTag key={tech} name={tech} size="md" />
            ))}
          </div>
        </Card>
      </FadeIn>

      {/* Main Technical Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Body Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Problem Statement & Objective */}
          {(project.problem || project.objective) && (
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {project.problem && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                      <AlertTriangle className="h-5 w-5 text-[var(--accent-primary)] shrink-0" />
                      <span>Problem Statement</span>
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.problem}
                    </p>
                  </Card>
                )}

                {project.objective && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span>Core Objective</span>
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.objective}
                    </p>
                  </Card>
                )}
              </div>
            </FadeIn>
          )}

          {/* Approach & Architecture Specification */}
          {(project.approach || project.architecture) && (
            <FadeIn delay={0.25}>
              <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  <Layers className="h-4 w-4" />
                  <span>TECHNICAL ARCHITECTURE & APPROACH</span>
                </div>

                {project.approach && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Engineering Approach</h3>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.approach}
                    </p>
                  </div>
                )}

                {project.architecture && (
                  <div className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] font-mono text-xs sm:text-sm text-[var(--text-secondary)] space-y-2">
                    <span className="text-[var(--accent-primary)] font-bold block text-xs">
                      {"// SYSTEM ARCHITECTURE SPECIFICATION"}
                    </span>
                    <p className="leading-relaxed">{project.architecture}</p>
                  </div>
                )}
              </Card>
            </FadeIn>
          )}

          {/* Implementation Details */}
          {project.implementation && (
            <FadeIn delay={0.3}>
              <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Implementation Details
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {project.implementation}
                </p>
              </Card>
            </FadeIn>
          )}

          {/* Results & Outcomes */}
          {project.results && (
            <FadeIn delay={0.35}>
              <Card className="p-6 rounded-2xl glass-elevated border border-[var(--accent-glow)] bg-[var(--accent-soft)]/20 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent-primary)] shrink-0" />
                  <span>Results & Outcomes</span>
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {project.results}
                </p>
              </Card>
            </FadeIn>
          )}

          {/* Key Challenges & Learnings */}
          {(project.challenges || project.learnings) && (
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenges && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>Key Challenges</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.challenges}
                    </p>
                  </Card>
                )}

                {project.learnings && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                      <span>Engineering Learnings</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.learnings}
                    </p>
                  </Card>
                )}
              </div>
            </FadeIn>
          )}

          {/* Future Work */}
          {project.futureWork && (
            <FadeIn delay={0.45}>
              <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                  <span>Future Roadmap</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.futureWork}
                </p>
              </Card>
            </FadeIn>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="space-y-6">
          {/* Metadata & Specs */}
          <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
            <h3 className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
              METADATA & SPECIFICATIONS
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Category</span>
                <span className="text-[var(--text-primary)] font-semibold">{project.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Release Year</span>
                <span className="text-[var(--text-primary)] font-semibold">{project.year}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Status</span>
                <span className="text-[var(--text-primary)] font-semibold">{project.status}</span>
              </div>
              {project.featured && (
                <div className="flex justify-between py-1.5">
                  <span className="text-[var(--text-muted)]">Featured</span>
                  <span className="text-[var(--accent-primary)] font-semibold">Yes</span>
                </div>
              )}
            </div>
          </Card>

          {/* Related Research Cross-Links */}
          {relatedResearchData.length > 0 && (
            <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
              <h3 className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
                RELATED RESEARCH
              </h3>
              <div className="space-y-3">
                {relatedResearchData.map((res) => (
                  <Link
                    key={res.id}
                    href={`/research/${res.slug}`}
                    className="group block p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all text-xs"
                  >
                    <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center justify-between gap-2">
                      <span className="line-clamp-2">{res.title}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* Related Projects Cross-Links */}
          {relatedProjectsData.length > 0 && (
            <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
              <h3 className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
                RELATED PROJECTS
              </h3>
              <div className="space-y-3">
                {relatedProjectsData.map((relProj) => (
                  <Link
                    key={relProj.id}
                    href={`/projects/${relProj.slug}`}
                    className="group block p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all text-xs"
                  >
                    <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center justify-between gap-2">
                      <span className="line-clamp-2">{relProj.title}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>

      {/* Adjacent System Navigation Footer */}
      {(prevProject || nextProject) && (
        <FadeIn delay={0.5} className="pt-8 border-t border-[var(--border)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-5 rounded-2xl glass-elevated border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all flex items-center gap-4"
              >
                <ChevronLeft className="h-6 w-6 text-[var(--accent-primary)] shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                    PREVIOUS CASE STUDY
                  </span>
                  <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate block">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-5 rounded-2xl glass-elevated border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all flex items-center justify-between gap-4 sm:text-right"
              >
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                    NEXT CASE STUDY
                  </span>
                  <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate block">
                    {nextProject.title}
                  </span>
                </div>
                <ChevronRight className="h-6 w-6 text-[var(--accent-primary)] shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </FadeIn>
      )}
    </article>
  );
};
