import React from "react";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  className = "",
  ...props
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  const titleSizeClasses = {
    sm: "text-xl sm:text-2xl font-bold tracking-tight",
    md: "text-2xl sm:text-4xl font-bold tracking-tight",
    lg: "text-3xl sm:text-5xl font-extrabold tracking-tight",
  };

  return (
    <div className={`flex flex-col ${alignClasses[align]} max-w-3xl mb-8 sm:mb-12 ${className}`} {...props}>
      {eyebrow && (
        <span className="font-mono text-xs sm:text-sm font-semibold text-sky-400 tracking-wider uppercase mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-slate-100 ${titleSizeClasses[size]}`}>
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
