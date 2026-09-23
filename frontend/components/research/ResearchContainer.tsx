"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Research } from "@/types/portfolio";
import { ResearchCard } from "./ResearchCard";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Search, X, FlaskConical, Filter, RotateCcw, Database, FileText } from "lucide-react";

export interface ResearchContainerProps {
  initialResearch: Research[];
}

export const ResearchContainer: React.FC<ResearchContainerProps> = ({
  initialResearch,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [, startTransition] = useTransition();

  // Dynamically extract categories from initial research entries
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialResearch.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialResearch]);

  // Compute telemetry metrics from verified research data
  const telemetry = useMemo(() => {
    let datasetCount = 0;
    let experimentCount = 0;
    let publicationCount = 0;

    initialResearch.forEach((r) => {
      if (r.dataset) datasetCount += 1;
      if (r.experiments?.length) experimentCount += r.experiments.length;
      if (r.publications?.length) publicationCount += r.publications.length;
    });

    return { datasetCount, experimentCount, publicationCount };
  }, [initialResearch]);

  const updateParam = (key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/research?${params.toString()}`, { scroll: false });
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
    router.push("/research", { scroll: false });
  };

  const isFilterActive = currentCategory !== "All" || !!currentSearch;

  const filteredResearch = useMemo(() => {
    return initialResearch.filter((r) => {
      const matchesCategory =
        currentCategory === "All" || r.category === currentCategory;

      const query = currentSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.abstract.toLowerCase().includes(query) ||
        r.motivation.toLowerCase().includes(query) ||
        r.methodology.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        (r.dataset?.name && r.dataset.name.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialResearch, currentCategory, currentSearch]);

  // Extract verified datasets & publications from filtered items
  const activeDatasets = useMemo(() => {
    return filteredResearch.map((r) => r.dataset).filter(Boolean);
  }, [filteredResearch]);

  const activePublications = useMemo(() => {
    const list: Array<{ title: string; venue: string; status: string }> = [];
    filteredResearch.forEach((r) => {
      r.publications?.forEach((pub) => list.push(pub));
    });
    return list;
  }, [filteredResearch]);

  return (
    <div className="space-y-8">
      {/* Workspace Control Panel */}
      <Card className="p-5 sm:p-6 rounded-2xl glass-elevated border border-[var(--border)] shadow-xl space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-[var(--accent-primary)]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              RESEARCH LOGBOOK // SYSTEM CONTROL
            </span>
          </div>
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            SHOWING <span className="text-[var(--accent-primary)] font-bold">{filteredResearch.length}</span> OF {initialResearch.length} RESEARCH ENTRIES
          </div>
        </div>

        {/* Telemetry Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">ENTRIES</span>
            <span className="text-[var(--text-primary)] font-bold text-sm">{initialResearch.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">DATASETS</span>
            <span className="text-[var(--text-primary)] font-bold text-sm">{telemetry.datasetCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">EXPERIMENTS</span>
            <span className="text-[var(--text-primary)] font-bold text-sm">{telemetry.experimentCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">PUBLICATIONS</span>
            <span className="text-[var(--text-primary)] font-bold text-sm">{telemetry.publicationCount}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <Input
            placeholder="Search by research topic, abstract, methodology, or dataset..."
            value={searchQuery}
            onChange={handleSearchChange}
            leftIcon={<Search className="h-4 w-4 text-[var(--text-muted)]" />}
            rightIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Category Filters */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
            Research Domain / Category:
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

        {/* Active Filters Bar */}
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

      {/* Research Grid or Empty State */}
      {filteredResearch.length > 0 ? (
        <div className="space-y-12">
          {/* Research Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResearch.map((item, index) => (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }
                }
              >
                <ResearchCard research={item} />
              </motion.div>
            ))}
          </div>

          {/* Research Infrastructure & Verified Dataset Telemetry Panel */}
          {activeDatasets.length > 0 && (
            <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                <Database className="h-4 w-4" />
                <span>RESEARCH INFRASTRUCTURE & DATASETS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDatasets.map((ds, idx) => (
                  <div
                    key={ds?.name || idx}
                    className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-[var(--text-primary)]">
                      <span>{ds?.name}</span>
                      <Badge variant="accent" size="sm">
                        {ds?.format || "Dataset"}
                      </Badge>
                    </div>
                    <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                      {ds?.description}
                    </p>
                    {ds?.size && (
                      <div className="text-[var(--text-muted)] text-[10px] border-t border-[var(--border)] pt-2">
                        Size / Split: {ds.size}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Verified Publications Panel */}
          {activePublications.length > 0 && (
            <Card className="p-6 rounded-2xl glass-elevated border border-[var(--border)] space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                <FileText className="h-4 w-4" />
                <span>PUBLICATIONS & PAPERS</span>
              </div>
              <div className="space-y-3">
                {activePublications.map((pub, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-1">
                        {pub.title}
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        Target Venue: {pub.venue}
                      </span>
                    </div>
                    <Badge variant="accent" size="sm" className="self-start sm:self-center shrink-0">
                      {pub.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        <EmptyState
          title="No Research Entries Found"
          description="No experimental logbook entries match your search query or category filter."
          actionLabel="Clear all filters"
          onAction={clearAllFilters}
        />
      )}
    </div>
  );
};
