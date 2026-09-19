"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";

const HeroSceneComponent = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

export const DynamicHeroSceneWrapper: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return <HeroSceneComponent className={className} />;
};
