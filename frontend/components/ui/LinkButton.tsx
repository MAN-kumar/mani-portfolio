import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  variant = "primary",
  size = "md",
  isExternal = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2 select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "gradient-accent-button text-white font-semibold hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-[var(--accent-glow)]",
    secondary:
      "bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-hover)] active:bg-[var(--surface)]",
    ghost:
      "bg-transparent hover:bg-[var(--accent-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:bg-[var(--surface)]",
    outline:
      "bg-transparent border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)]",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (isExternal || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        {...props}
      >
        {leftIcon}
        <span>{children}</span>
        {rightIcon || <ExternalLink className="h-3.5 w-3.5 opacity-70" />}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} {...props}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </Link>
  );
};
