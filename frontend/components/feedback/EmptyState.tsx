import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  description = "Try adjusting your search terms or filter criteria.",
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] my-8 ${className}`}
    >
      <div className="p-4 rounded-full bg-[var(--surface)] border border-[var(--border-hover)] mb-4 text-[var(--accent-primary)]">
        <SearchX className="h-8 w-8 text-[var(--accent-primary)]" />
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
