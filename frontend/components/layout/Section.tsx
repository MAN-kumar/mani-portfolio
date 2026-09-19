import React from "react";
import { PageContainer, PageContainerProps } from "./PageContainer";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  spacing?: "none" | "sm" | "md" | "lg";
  className?: string;
  containerProps?: Partial<PageContainerProps>;
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  spacing = "md",
  className = "",
  containerProps,
  ...props
}) => {
  const spacingClasses = {
    none: "py-0",
    sm: "py-8 sm:py-12",
    md: "py-16 sm:py-24",
    lg: "py-24 sm:py-32",
  };

  return (
    <section
      id={id}
      className={`relative w-full ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      <PageContainer {...containerProps}>{children}</PageContainer>
    </section>
  );
};
