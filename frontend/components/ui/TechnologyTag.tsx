import React from "react";

export interface TechnologyTagProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  interactive?: boolean;
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
}

export const TechnologyTag: React.FC<TechnologyTagProps> = ({
  name,
  icon,
  active = false,
  interactive = false,
  size = "md",
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-mono text-xs tracking-tight rounded-md border transition-all duration-200 select-none";

  const stateStyles = active
    ? "bg-[var(--accent-soft)] border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-sm"
    : interactive
    ? "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] cursor-pointer active:bg-[var(--surface-hover)]"
    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)]";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  if (interactive || onClick) {
    return (
      <button
        type="button"
        className={`${baseStyles} ${stateStyles} ${sizeStyles[size]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)] ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {icon && <span className="inline-block opacity-80">{icon}</span>}
        <span>{name}</span>
      </button>
    );
  }

  return (
    <span
      className={`${baseStyles} ${stateStyles} ${sizeStyles[size]} ${className}`}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {icon && <span className="inline-block opacity-80">{icon}</span>}
      <span>{name}</span>
    </span>
  );
};
