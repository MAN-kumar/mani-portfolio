import React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "subtle" | "accent";
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  variant = "default",
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "border-slate-800/80",
    subtle: "border-slate-900",
    accent: "border-sky-500/20",
  };

  if (orientation === "vertical") {
    return (
      <div
        className={`inline-block h-full min-h-[1em] w-[1px] border-r ${variantClasses[variant]} ${className}`}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  return (
    <hr
      className={`w-full border-t ${variantClasses[variant]} my-6 sm:my-8 ${className}`}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
};
