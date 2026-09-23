"use client";

import React from "react";

export const GridBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none grid-blueprint opacity-60 ${className}`}
    />
  );
};
