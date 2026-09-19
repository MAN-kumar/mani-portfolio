import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An error occurred while loading content. Please try again.",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`p-6 sm:p-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center flex flex-col items-center my-6 ${className}`}
    >
      <AlertCircle className="h-8 w-8 text-rose-400 mb-3" />
      <h3 className="text-base font-bold text-rose-300 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
