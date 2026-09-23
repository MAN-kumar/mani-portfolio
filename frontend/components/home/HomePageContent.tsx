"use client";

import React, { useState } from "react";
import { Profile, Project, Skill, Research, JourneyItem } from "@/types/portfolio";
import { Hero } from "@/components/home/Hero";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { ResearchPreview } from "@/components/home/ResearchPreview";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Filter, X } from "lucide-react";

export interface HomePageContentProps {
  profile: Profile;
  featuredProjects: Project[];
  skills: Skill[];
  researchList: Research[];
  journeyItems: JourneyItem[];
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  profile,
  featuredProjects,
  skills,
  researchList,
  journeyItems,
}) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const handleSelectTech = (tech: string) => {
    setSelectedTech((prev) => (prev?.toLowerCase() === tech.toLowerCase() ? null : tech));
  };

  return (
    <div className="space-y-4">
      {/* Sticky Active Relationship Filter Bar */}
      {selectedTech && (
        <div className="sticky top-20 z-40 flex items-center justify-between p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--accent-primary)] backdrop-blur-xl shadow-xl font-mono text-xs text-[var(--text-primary)] transition-all">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            <span>RELATIONSHIP FILTER ACTIVE:</span>
            <span className="px-2.5 py-0.5 rounded-md bg-[var(--accent-soft)] text-[var(--accent-primary)] font-bold border border-[var(--accent-glow)]">
              {selectedTech}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTech(null)}
            className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>CLEAR</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <Hero profile={profile} onSelectTech={handleSelectTech} selectedTech={selectedTech} />

      {/* Current Focus */}
      <CurrentFocus profile={profile} />

      {/* Featured Projects */}
      <FeaturedProjects
        projects={featuredProjects}
        selectedTech={selectedTech}
        onSelectTech={handleSelectTech}
      />

      {/* Skills Snapshot */}
      <SkillsPreview
        skills={skills}
        selectedTech={selectedTech}
        onSelectTech={handleSelectTech}
      />

      {/* Research Preview */}
      <ResearchPreview
        researchList={researchList}
        selectedTech={selectedTech}
      />

      {/* Journey Preview */}
      <JourneyPreview items={journeyItems} />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
};
