"use client";

import React from "react";
import Link from "next/link";
import { Research, Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  ArrowLeft,
  FlaskConical,
  Database,
  Cpu,
  ArrowUpRight,
  FileText,
  AlertTriangle,
  Lightbulb,
  Compass,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface ResearchDetailViewProps {
  research: Research;
  relatedProjectsData?: Project[];
  prevResearch?: Research;
  nextResearch?: Research;
}

export const ResearchDetailView: React.FC<ResearchDetailViewProps> = ({
  research,
  relatedProjectsData = [],
  prevResearch,
  nextResearch,
}) => {
  return (
    <article className="space-y-10">
      {/* Top Header & Navigation */}
      <FadeIn>
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO RESEARCH LOGBOOK</span>
          </Link>

          <span className="font-mono text-[11px] text-[var(--accent-primary)] font-bold tracking-widest uppercase hidden sm:inline-block">
            RESEARCH RECORD // {research.slug}.sys
          </span>
        </div>
      </FadeIn>

      {/* Hero Header & Title */}
      <FadeIn delay={0.1}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" size="md">
              {research.status}
            </Badge>
            <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold tracking-wider uppercase">
              {research.category} {"//"} {research.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1]">
            {research.title}
          </h1>

          {/* Abstract Block */}
          <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
            <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
              {"// ABSTRACT & OVERVIEW"}
            </span>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {research.abstract}
            </p>
          </Card>
        </div>
      </FadeIn>

      <Divider variant="subtle" />

      {/* Main Grid Story */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Research Question & Core Motivation */}
          {(research.researchQuestion || research.motivation) && (
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {research.researchQuestion && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                      <FlaskConical className="h-5 w-5 text-[var(--accent-primary)] shrink-0" />
                      <span>Research Question</span>
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {research.researchQuestion}
                    </p>
                  </Card>
                )}

                {research.motivation && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                      <Lightbulb className="h-5 w-5 text-[var(--accent-primary)] shrink-0" />
                      <span>Core Motivation & Problem Context</span>
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {research.motivation}
                    </p>
                  </Card>
                )}
              </div>
            </FadeIn>
          )}

          {/* Dataset Specification */}
          {research.dataset && (
            <FadeIn delay={0.25}>
              <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  <Database className="h-4 w-4" />
                  <span>DATASET SPECIFICATION & BENCHMARKS</span>
                </div>

                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-base">
                      {research.dataset.name}
                    </h3>
                    <p className="mt-1 leading-relaxed">{research.dataset.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                      <span className="text-[var(--text-muted)] block text-[10px] uppercase">SOURCE</span>
                      <span className="text-[var(--text-primary)] font-semibold">{research.dataset.source}</span>
                    </div>
                    {research.dataset.featureCount && (
                      <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                        <span className="text-[var(--text-muted)] block text-[10px] uppercase">FEATURE DIMENSIONS</span>
                        <span className="text-[var(--text-primary)] font-semibold">{research.dataset.featureCount} Features</span>
                      </div>
                    )}
                    {research.dataset.size && (
                      <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                        <span className="text-[var(--text-muted)] block text-[10px] uppercase">DATASET SPLIT / SIZE</span>
                        <span className="text-[var(--text-primary)] font-semibold">{research.dataset.size}</span>
                      </div>
                    )}
                    {research.dataset.format && (
                      <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                        <span className="text-[var(--text-muted)] block text-[10px] uppercase">STORAGE FORMAT</span>
                        <span className="text-[var(--text-primary)] font-semibold">{research.dataset.format}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </FadeIn>
          )}

          {/* Methodology & Feature Pipeline */}
          {research.methodology && (
            <FadeIn delay={0.3}>
              <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  <Layers className="h-4 w-4" />
                  <span>METHODOLOGY & EXPERIMENTAL PIPELINE</span>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {research.methodology}
                </p>
              </Card>
            </FadeIn>
          )}

          {/* Experiments & Model Evaluation */}
          {research.experiments && research.experiments.length > 0 && (
            <FadeIn delay={0.35}>
              <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  <Cpu className="h-4 w-4" />
                  <span>EXPERIMENTAL EVALUATION & MODEL COMPARISON</span>
                </div>

                {research.experiments.map((exp, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 pb-2 border-b border-[var(--border)]">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">{exp.name}</h3>
                      <span className="font-mono text-xs text-[var(--accent-primary)] font-semibold">
                        Model: {exp.model}
                      </span>
                    </div>

                    {exp.notes && (
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {exp.notes}
                      </p>
                    )}

                    {exp.results && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 font-mono">
                        {exp.results.map((res, resIdx) => (
                          <div
                            key={resIdx}
                            className="p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-center space-y-1"
                          >
                            <span className="text-[10px] text-[var(--text-muted)] uppercase block">
                              {res.metric}
                            </span>
                            <span className="text-base sm:text-lg font-bold text-[var(--accent-primary)] block">
                              {res.value} {res.unit || ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </Card>
            </FadeIn>
          )}

          {/* Publications & Dissemination */}
          {research.publications && research.publications.length > 0 && (
            <FadeIn delay={0.4}>
              <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  <FileText className="h-4 w-4" />
                  <span>PUBLICATIONS & DISSEMINATION</span>
                </div>

                <div className="space-y-3">
                  {research.publications.map((pub, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)] text-sm mb-1">
                          {pub.title}
                        </h4>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] block">
                          Venue: {pub.venue}
                        </span>
                      </div>
                      <Badge variant="accent" size="sm" className="self-start sm:self-center shrink-0">
                        {pub.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          )}

          {/* Scope, Limitations & Future Directions */}
          {(research.limitations || research.futureWork) && (
            <FadeIn delay={0.45}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {research.limitations && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>Scope & Limitations</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {research.limitations}
                    </p>
                  </Card>
                )}

                {research.futureWork && (
                  <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-3">
                    <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Compass className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                      <span>Future Directions</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {research.futureWork}
                    </p>
                  </Card>
                )}
              </div>
            </FadeIn>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="space-y-6">
          {/* Record Metadata */}
          <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
            <h3 className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
              RESEARCH RECORD METADATA
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Category</span>
                <span className="text-[var(--text-primary)] font-semibold">{research.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Research Year</span>
                <span className="text-[var(--text-primary)] font-semibold">{research.year}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Status</span>
                <span className="text-[var(--text-primary)] font-semibold">{research.status}</span>
              </div>
              {research.featured && (
                <div className="flex justify-between py-1.5">
                  <span className="text-[var(--text-muted)]">Featured</span>
                  <span className="text-[var(--accent-primary)] font-semibold">Yes</span>
                </div>
              )}
            </div>
          </Card>

          {/* Related Implemented Projects Cross-Links */}
          {relatedProjectsData.length > 0 && (
            <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
              <h3 className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
                IMPLEMENTED IN PROJECTS
              </h3>
              <div className="space-y-3">
                {relatedProjectsData.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    className="group block p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all text-xs"
                  >
                    <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center justify-between gap-2">
                      <span className="line-clamp-2">{proj.title}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>

      {/* Adjacent Research Navigation Footer */}
      {(prevResearch || nextResearch) && (
        <FadeIn delay={0.5} className="pt-8 border-t border-[var(--border)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevResearch ? (
              <Link
                href={`/research/${prevResearch.slug}`}
                className="group p-5 rounded-2xl glass-elevated border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all flex items-center gap-4"
              >
                <ChevronLeft className="h-6 w-6 text-[var(--accent-primary)] shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                    PREVIOUS RESEARCH RECORD
                  </span>
                  <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate block">
                    {prevResearch.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextResearch && (
              <Link
                href={`/research/${nextResearch.slug}`}
                className="group p-5 rounded-2xl glass-elevated border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all flex items-center justify-between gap-4 sm:text-right"
              >
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                    NEXT RESEARCH RECORD
                  </span>
                  <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate block">
                    {nextResearch.title}
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
