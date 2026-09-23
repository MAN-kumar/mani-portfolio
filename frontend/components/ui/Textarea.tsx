import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      disabled,
      className = "",
      containerClassName = "",
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-medium text-[var(--text-secondary)] tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-lg border transition-all duration-200 p-3.5 ${
            error
              ? "border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              : "border-[var(--border)] hover:border-[var(--border-hover)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {error ? (
          <span className="text-xs text-rose-400 font-medium mt-0.5">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-[var(--text-muted)] mt-0.5">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
