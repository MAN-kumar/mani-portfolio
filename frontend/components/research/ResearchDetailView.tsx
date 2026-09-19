import React from "react";
import Link from "next/link";
import { Research, Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowLeft, FlaskConical, Database, Cpu, ArrowUpRight } from "lucide-react";

export interface ResearchDetailViewProps {
  research: Research;
  relatedProjectsData?: Project[];
}

export const ResearchDetailView: React.FC<ResearchDetailViewProps> = ({
  research,
  relatedProjectsData = [],
}) => {
  return (
    <article className="py-12 sm:py-16">
      {/* Back button link */}
      <FadeIn>
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Research Lab</span>
        </Link>
      </FadeIn>

      {/* Hero Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="accent" size="md">
            {research.status}
          </Badge>
          <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
            {research.category} {"//"} {research.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight mb-6">
          {research.title}
        </h1>

        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 mb-8">
          <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase block mb-2">
            Abstract
          </span>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {research.abstract}
          </p>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Research Question & Motivation */}
          <FadeIn>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-sky-400" />
                  Research Question
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                  {research.researchQuestion}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">Core Motivation</h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {research.motivation}
                </p>
              </div>
            </section>
          </FadeIn>

          {/* Dataset Specification */}
          {research.dataset && (
            <FadeIn>
              <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Database className="h-5 w-5 text-sky-400" />
                  Dataset Specification
                </h2>
                <div className="space-y-2 text-sm text-slate-300">
                  <p><strong className="text-slate-100">Dataset Name:</strong> {research.dataset.name}</p>
                  <p><strong className="text-slate-100">Description:</strong> {research.dataset.description}</p>
                  <p><strong className="text-slate-100">Source:</strong> {research.dataset.source}</p>
                  {research.dataset.featureCount && (
                    <p><strong className="text-slate-100">Feature Dimensions:</strong> {research.dataset.featureCount} features</p>
                  )}
                  {research.dataset.format && (
                    <p><strong className="text-slate-100">Storage Format:</strong> {research.dataset.format}</p>
                  )}
                </div>
              </section>
            </FadeIn>
          )}

          {/* Methodology */}
          <FadeIn>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-100">Methodology</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {research.methodology}
              </p>
            </section>
          </FadeIn>

          {/* Experiments & Model Comparison */}
          {research.experiments && research.experiments.length > 0 && (
            <FadeIn>
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-sky-400" />
                  Experimental Evaluation & Model Comparison
                </h2>
                {research.experiments.map((exp, idx) => (
                  <div key={idx} className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <h3 className="text-lg font-bold text-slate-100">{exp.name}</h3>
                      <span className="font-mono text-xs text-sky-400">Model: {exp.model}</span>
                    </div>
                    {exp.notes && (
                      <p className="text-xs sm:text-sm text-slate-400">{exp.notes}</p>
                    )}

                    {exp.results && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {exp.results.map((res, resIdx) => (
                          <div key={resIdx} className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 text-center">
                            <span className="text-xs text-slate-400 block mb-1">{res.metric}</span>
                            <span className="text-2xl font-mono font-bold text-sky-400">
                              {res.value} {res.unit || ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            </FadeIn>
          )}

          {/* Limitations & Future Work */}
          {(research.limitations || research.futureWork) && (
            <FadeIn>
              <section className="space-y-6">
                {research.limitations && (
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h3 className="text-base font-bold text-slate-200 mb-2">Scope & Limitations</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{research.limitations}</p>
                  </div>
                )}
                {research.futureWork && (
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h3 className="text-base font-bold text-slate-200 mb-2">Future Directions</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{research.futureWork}</p>
                  </div>
                )}
              </section>
            </FadeIn>
          )}
        </div>

        {/* Sidebar Sidebar */}
        <aside className="space-y-8">
          {/* Related Projects */}
          {relatedProjectsData.length > 0 && (
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
                Implemented In Projects
              </h3>
              <div className="space-y-3">
                {relatedProjectsData.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    className="group block p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-colors text-xs"
                  >
                    <span className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors flex items-center justify-between">
                      <span>{proj.title}</span>
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
