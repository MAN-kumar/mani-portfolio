import React from "react";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "narrow" | "default" | "wide" | "full";
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = "default",
  className = "",
  ...props
}) => {
  const maxWidthClasses = {
    narrow: "max-w-4xl", // ~896px
    default: "max-w-6xl", // ~1152px
    wide: "max-w-7xl", // ~1280px
    full: "max-w-full",
  };

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
