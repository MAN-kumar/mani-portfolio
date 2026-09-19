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
import { Divider } from "@/components/ui/Divider";
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
      {/* Sticky Active Filter Bar */}
      {selectedTech && (
        <div className="sticky top-20 z-40 flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-sky-500/40 backdrop-blur-md shadow-lg font-mono text-xs text-slate-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-sky-400" />
            <span>RELATIONSHIP FILTER ACTIVE:</span>
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
              {selectedTech}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTech(null)}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <span>CLEAR</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Hero Section with 3D content graph & relationship state */}
      <Hero profile={profile} onSelectTech={handleSelectTech} selectedTech={selectedTech} />

      <Divider variant="subtle" />

      {/* Current Focus & Philosophy Data Toggle */}
      <CurrentFocus profile={profile} />

      <Divider variant="subtle" />

      {/* Featured Projects with Relationship Highlighting */}
      <FeaturedProjects
        projects={featuredProjects}
        selectedTech={selectedTech}
        onSelectTech={handleSelectTech}
      />

      <Divider variant="subtle" />

      {/* Skills Snapshot with Relationship Highlighting */}
      <SkillsPreview
        skills={skills}
        selectedTech={selectedTech}
        onSelectTech={handleSelectTech}
      />

      <Divider variant="subtle" />

      {/* Research Preview with Relationship Highlighting */}
      <ResearchPreview
        researchList={researchList}
        selectedTech={selectedTech}
      />

      <Divider variant="subtle" />

      {/* Journey Preview */}
      <JourneyPreview items={journeyItems} />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
};
