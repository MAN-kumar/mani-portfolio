"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/types/portfolio";
import { ProjectGrid } from "./ProjectGrid";
import { Input } from "@/components/ui/Input";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Search, X, SlidersHorizontal } from "lucide-react";

export interface ProjectsContainerProps {
  initialProjects: Project[];
}

export const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  initialProjects,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";
  const currentTech = searchParams.get("tech") || "All";
  const currentSearch = searchParams.get("q") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [, startTransition] = useTransition();

  // Extract categories & technologies dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const updateParam = (key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/projects?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateParam("q", val);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    router.push("/projects", { scroll: false });
  };

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesCategory =
        currentCategory === "All" || p.category === currentCategory;
      const matchesTech =
        currentTech === "All" ||
        p.technologies.some((t) => t.toLowerCase() === currentTech.toLowerCase());
      const matchesSearch =
        !currentSearch ||
        p.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(currentSearch.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(currentSearch.toLowerCase())
        );

      return matchesCategory && matchesTech && matchesSearch;
    }).sort((a, b) => {
      if (currentSort === "oldest") return a.year - b.year;
      return b.year - a.year; // default newest
    });
  }, [initialProjects, currentCategory, currentTech, currentSearch, currentSort]);

  return (
    <div className="space-y-8">
      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search projects or technologies..."
            value={searchQuery}
            onChange={handleSearchChange}
            leftIcon={<Search className="h-4 w-4 text-slate-400" />}
            rightIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    updateParam("q", "");
                  }}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : undefined
            }
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5 text-sky-400" />
            <span>Sort:</span>
          </div>
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-mono rounded-lg border border-slate-800 p-2 focus:border-sky-400 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2">Category:</span>
        {categories.map((cat) => {
          const isActive = currentCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => updateParam("category", cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                isActive
                  ? "bg-sky-500/15 border-sky-400/40 text-sky-300 font-semibold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Technology Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-mono text-slate-400 mr-2">Technology:</span>
        {technologies.map((tech) => (
          <TechnologyTag
            key={tech}
            name={tech}
            active={currentTech === tech}
            interactive
            onClick={() => updateParam("tech", tech)}
          />
        ))}
      </div>

      {/* Filtered Results */}
      {filteredProjects.length > 0 ? (
        <ProjectGrid projects={filteredProjects} />
      ) : (
        <EmptyState
          title="No projects match your filter"
          description="Try selecting a different category or clearing search parameters."
          actionLabel="Clear all filters"
          onAction={clearAllFilters}
        />
      )}
    </div>
  );
};
