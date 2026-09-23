import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent" | "success" | "warning";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-mono font-medium rounded-full transition-colors select-none";

  const variantStyles = {
    default: "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)]",
    outline: "bg-transparent text-[var(--text-secondary)] border border-[var(--border-hover)]",
    accent: "bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-glow)]",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
