import React from "react";
import Link from "next/link";
import { Project, Research } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { Divider } from "@/components/ui/Divider";
import { FadeIn } from "@/components/motion/FadeIn";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowLeft, ExternalLink, ArrowUpRight, CheckCircle2, AlertTriangle, Lightbulb, Compass } from "lucide-react";

export interface ProjectDetailViewProps {
  project: Project;
  relatedProjectsData?: Project[];
  relatedResearchData?: Research[];
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  relatedProjectsData = [],
  relatedResearchData = [],
}) => {
  return (
    <article className="py-12 sm:py-16">
      {/* Back button link */}
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Link>
      </FadeIn>

      {/* Hero */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant={project.status === "Completed" ? "success" : "accent"} size="md">
            {project.status}
          </Badge>
          <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
            {project.category} {"//"} {project.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight mb-6">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Links CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
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
      </FadeIn>

      <Divider variant="subtle" />

      {/* Tech Stack */}
      <FadeIn delay={0.2} className="my-10">
        <h2 className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase mb-4">
          Technologies & Tools
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechnologyTag key={tech} name={tech} size="md" />
          ))}
        </div>
      </FadeIn>

      {/* Main Grid Story */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-12">
        {/* Main Content Body */}
        <div className="lg:col-span-2 space-y-12">
          {/* Problem & Objective */}
          {(project.problem || project.objective) && (
            <FadeIn>
              <section className="space-y-6">
                {project.problem && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-sky-400" />
                      Problem Statement
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.objective && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      Core Objective
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                      {project.objective}
                    </p>
                  </div>
                )}
              </section>
            </FadeIn>
          )}

          {/* Approach & Architecture */}
          {(project.approach || project.architecture) && (
            <FadeIn>
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-100">Approach & System Architecture</h2>
                {project.approach && (
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.approach}
                  </p>
                )}
                {project.architecture && (
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300">
                    <span className="text-sky-400 font-semibold block mb-2">{"// Architecture Specification"}</span>
                    <p className="text-slate-400 leading-relaxed">{project.architecture}</p>
                  </div>
                )}
              </section>
            </FadeIn>
          )}

          {/* Implementation Details */}
          {project.implementation && (
            <FadeIn>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-100">Implementation Details</h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.implementation}
                </p>
              </section>
            </FadeIn>
          )}

          {/* Results & Key Metrics */}
          {project.results && (
            <FadeIn>
              <section className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-sky-500/20">
                <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-sky-400" />
                  Results & Outcomes
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.results}
                </p>
              </section>
            </FadeIn>
          )}

          {/* Challenges & Learnings */}
          {(project.challenges || project.learnings) && (
            <FadeIn>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenges && (
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h3 className="text-base font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      Key Challenges
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}
                {project.learnings && (
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h3 className="text-base font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-sky-400" />
                      Engineering Learnings
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {project.learnings}
                    </p>
                  </div>
                )}
              </section>
            </FadeIn>
          )}

          {/* Future Work */}
          {project.futureWork && (
            <FadeIn>
              <section className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <h3 className="text-base font-bold text-slate-200 mb-2 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-indigo-400" />
                  Future Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {project.futureWork}
                </p>
              </section>
            </FadeIn>
          )}
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
              Metadata & Stats
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Category</span>
                <span className="text-slate-200 font-medium">{project.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Development Year</span>
                <span className="text-slate-200 font-medium">{project.year}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status</span>
                <span className="text-slate-200 font-medium">{project.status}</span>
              </div>
            </div>
          </div>

          {/* Cross-linked Related Research */}
          {relatedResearchData.length > 0 && (
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
                Related Research
              </h3>
              <div className="space-y-3">
                {relatedResearchData.map((res) => (
                  <Link
                    key={res.id}
                    href={`/research/${res.slug}`}
                    className="group block p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-colors text-xs"
                  >
                    <span className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors flex items-center justify-between">
                      <span>{res.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cross-linked Related Projects */}
          {relatedProjectsData.length > 0 && (
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
                Related Projects
              </h3>
              <div className="space-y-3">
                {relatedProjectsData.map((relProj) => (
                  <Link
                    key={relProj.id}
                    href={`/projects/${relProj.slug}`}
                    className="group block p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-colors text-xs"
                  >
                    <span className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors flex items-center justify-between">
                      <span>{relProj.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};
