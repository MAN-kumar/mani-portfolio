import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/journey/Timeline";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { getJourney } from "@/lib/data";
import { ArrowRight, Compass, Briefcase, GraduationCap, FolderGit2 } from "lucide-react";

export const metadata = {
  title: "Journey",
  description:
    "Chronological engineering log of education, full-stack developments, research progress, and career milestones.",
};

export default async function JourneyPage() {
  const journeyItems = await getJourney();

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <FadeIn>
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="03 // CHRONOLOGICAL LOGBOOK"
            title="Engineering Journey & Milestone Archive"
            description="Chronological record of education, full-stack application development, research experiments, and engineering milestones."
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-8">
        <Card className="p-6 sm:p-10 rounded-2xl glass-elevated border border-[var(--border)] shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)] font-mono text-xs">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[var(--accent-primary)]" />
              <span className="font-bold uppercase tracking-wider text-[var(--text-primary)]">
                CHRONOLOGICAL MILESTONES // {journeyItems.length} ENTRIES RECORDED
              </span>
            </div>
            <div className="flex items-center gap-3 text-[var(--text-muted)] text-[11px]">
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-[var(--accent-primary)]" /> Education
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-[var(--accent-primary)]" /> Experience
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FolderGit2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" /> Systems
              </span>
            </div>
          </div>

          <Timeline items={journeyItems} />
        </Card>
      </FadeIn>

      {/* Cross-Navigation Footer */}
      <FadeIn delay={0.3} className="mt-16 pt-8 border-t border-[var(--border)]">
        <Card className="p-8 sm:p-10 rounded-2xl glass-elevated border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              Explore Related Work & Technical Background
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Discover case studies, experimental research logbooks, or direct contact options.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <LinkButton href="/projects" variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Projects Directory
            </LinkButton>
            <LinkButton href="/about" variant="secondary" size="md">
              About Profile
            </LinkButton>
          </div>
        </Card>
      </FadeIn>
    </PageContainer>
  );
}
