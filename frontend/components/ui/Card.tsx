import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline";
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  hoverEffect = false,
  children,
  className = "",
  ...props
}) => {
  const variantStyles = {
    default: "glass-card",
    elevated: "glass-elevated",
    outline: "bg-[var(--surface)] border border-[var(--border)] rounded-xl",
  };

  const hoverStyles = hoverEffect
    ? "hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-[var(--accent-glow)]/10 hover:-translate-y-0.5 transition-all duration-300"
    : "";

  return (
    <div className={`${variantStyles[variant]} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`flex flex-col gap-1 p-6 border-b border-[var(--border)] ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <h3 className={`text-lg font-semibold text-[var(--text-primary)] tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <p className={`text-sm text-[var(--text-secondary)] ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
