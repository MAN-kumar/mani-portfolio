import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[var(--text-secondary)] tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 text-[var(--text-muted)] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-lg border transition-all duration-200 py-2.5 ${
              leftIcon ? "pl-9" : "pl-3.5"
            } ${rightIcon ? "pr-9" : "pr-3.5"} ${
              error
                ? "border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                : "border-[var(--border)] hover:border-[var(--border-hover)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
            } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[var(--text-muted)] pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <span className="text-xs text-rose-400 font-medium mt-0.5">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-[var(--text-muted)] mt-0.5">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
