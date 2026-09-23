"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/types/portfolio";
import { ProjectGrid } from "./ProjectGrid";
import { Input } from "@/components/ui/Input";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Search, X, SlidersHorizontal, Filter, RotateCcw } from "lucide-react";

export interface ProjectsContainerProps {
  initialProjects: Project[];
}

export const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  initialProjects,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Support both 'q' or 'search', and 'tech' or 'technology' parameters
  const currentCategory = searchParams.get("category") || "All";
  const currentTech = searchParams.get("technology") || searchParams.get("tech") || "All";
  const currentSearch = searchParams.get("search") || searchParams.get("q") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [, startTransition] = useTransition();

  // Extract categories & technologies dynamically from project data
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      p.technologies?.forEach((t) => set.add(t));
    });
    return ["All", ...Array.from(set).sort()];
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
    updateParam("search", val);
  };

  const clearSearch = () => {
    setSearchQuery("");
    updateParam("search", "");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    router.push("/projects", { scroll: false });
  };

  const isFilterActive =
    currentCategory !== "All" || currentTech !== "All" || !!currentSearch;

  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((p) => {
        const matchesCategory =
          currentCategory === "All" || p.category === currentCategory;
        const matchesTech =
          currentTech === "All" ||
          p.technologies.some((t) => t.toLowerCase() === currentTech.toLowerCase());

        const query = currentSearch.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.technologies.some((t) => t.toLowerCase().includes(query));

        return matchesCategory && matchesTech && matchesSearch;
      })
      .sort((a, b) => {
        if (currentSort === "oldest") return a.year - b.year;
        return b.year - a.year; // default newest
      });
  }, [initialProjects, currentCategory, currentTech, currentSearch, currentSort]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Panel */}
      <Card className="p-5 sm:p-6 rounded-2xl glass-elevated border border-[var(--border)] shadow-xl space-y-6">
        {/* Workspace Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[var(--accent-primary)]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              SYSTEM CONTROL // SEARCH & FILTERS
            </span>
          </div>
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            SHOWING <span className="text-[var(--accent-primary)] font-bold">{filteredProjects.length}</span> OF {initialProjects.length} PROJECTS
          </div>
        </div>

        {/* Search Bar & Sort Selection */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <Input
              placeholder="Search by title, technology, or keywords..."
              value={searchQuery}
              onChange={handleSearchChange}
              leftIcon={<Search className="h-4 w-4 text-[var(--text-muted)]" />}
              rightIcon={
                searchQuery ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label="Clear search input"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : undefined
              }
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2">
            <label htmlFor="sort-select" className="text-xs font-mono text-[var(--text-muted)] shrink-0">
              SORT BY:
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="w-full bg-[var(--surface-elevated)] text-[var(--text-primary)] text-xs font-mono rounded-lg border border-[var(--border)] px-3 py-2.5 focus:border-[var(--accent-primary)] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="newest">Newest First (2026 → 2025)</option>
              <option value="oldest">Oldest First (2025 → 2026)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Selector */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
            Category:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateParam("category", cat)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all select-none ${
                    isActive
                      ? "bg-[var(--accent-soft)] border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold shadow-sm"
                      : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technology Filter Selector */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
            Technology Filter:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <TechnologyTag
                key={tech}
                name={tech}
                size="sm"
                active={currentTech === tech}
                interactive
                onClick={() => updateParam("technology", tech)}
              />
            ))}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {isFilterActive && (
          <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                ACTIVE FILTERS:
              </span>

              {currentCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-glow)]">
                  Category: {currentCategory}
                  <button
                    type="button"
                    onClick={() => updateParam("category", "All")}
                    className="hover:text-rose-400 transition-colors ml-0.5"
                    aria-label={`Remove category filter ${currentCategory}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {currentTech !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-glow)]">
                  Tech: {currentTech}
                  <button
                    type="button"
                    onClick={() => updateParam("technology", "All")}
                    className="hover:text-rose-400 transition-colors ml-0.5"
                    aria-label={`Remove technology filter ${currentTech}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {currentSearch && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-glow)] truncate max-w-xs">
                  Query: &quot;{currentSearch}&quot;
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="hover:text-rose-400 transition-colors ml-0.5 shrink-0"
                    aria-label="Remove search query filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>CLEAR ALL</span>
            </button>
          </div>
        )}
      </Card>

      {/* Filtered Results Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <ProjectGrid
          projects={filteredProjects}
          selectedTech={currentTech !== "All" ? currentTech : null}
          onSelectTech={(tech) => updateParam("technology", tech)}
        />
      ) : (
        <EmptyState
          title="No Projects Found"
          description="No engineering projects match your selected filters or search query."
          actionLabel="Clear all filters"
          onAction={clearAllFilters}
        />
      )}
    </div>
  );
};
