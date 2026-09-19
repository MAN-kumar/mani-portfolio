import React from "react";

export interface TechnologyTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  interactive?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const TechnologyTag: React.FC<TechnologyTagProps> = ({
  name,
  icon,
  active = false,
  interactive = false,
  size = "md",
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-mono text-xs tracking-tight rounded-md border transition-all duration-200 select-none";

  const stateStyles = active
    ? "bg-sky-500/15 border-sky-400/40 text-sky-300 shadow-sm"
    : interactive
    ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 cursor-pointer active:bg-slate-800"
    : "bg-slate-900/40 border-slate-800/80 text-slate-400";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={`${baseStyles} ${stateStyles} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {icon && <span className="inline-block opacity-80">{icon}</span>}
      <span>{name}</span>
    </span>
  );
};
