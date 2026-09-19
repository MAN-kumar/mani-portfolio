import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
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
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2 select-none";

  const variantStyles = {
    primary:
      "bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-semibold shadow-sm hover:shadow-sky-500/20",
    secondary:
      "bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-slate-800 hover:border-slate-700 active:bg-slate-950",
    ghost:
      "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 active:bg-slate-800",
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
