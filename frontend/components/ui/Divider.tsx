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
    default: "border-[var(--border)]",
    subtle: "border-[var(--border)]/50",
    accent: "border-[var(--accent-glow)]",
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
