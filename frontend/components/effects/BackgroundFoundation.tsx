"use client";

import React from "react";
import { GridBackground } from "./GridBackground";
import { GrainOverlay } from "./GrainOverlay";
import { Spotlight } from "./Spotlight";

export const BackgroundFoundation: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] selection:bg-[var(--accent-soft)] selection:text-white overflow-hidden">
      {/* 1. Ambient Halo Light Source (Top center glow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-20 blur-[120px] transition-colors duration-700 z-0"
        style={{
          background: `radial-gradient(circle, var(--accent-primary) 0%, var(--accent-soft) 50%, transparent 80%)`,
        }}
      />

      {/* 2. Haikei-Style Organic Generative Vector Meshes */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/4 -left-48 w-96 h-96 opacity-10 blur-3xl z-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at center, var(--accent-secondary), transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-1/4 -right-48 w-[32rem] h-[32rem] opacity-10 blur-3xl z-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at center, var(--accent-primary), transparent 70%)`,
        }}
      />

      {/* Haikei Organic SVG Mesh Lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.04] z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="haikeiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
        <path
          d="M 0 100 Q 350 300 700 100 T 1400 100"
          fill="none"
          stroke="url(#haikeiGradient)"
          strokeWidth="2"
        />
        <path
          d="M 0 400 Q 400 200 800 500 T 1600 300"
          fill="none"
          stroke="url(#haikeiGradient)"
          strokeWidth="1.5"
        />
      </svg>

      {/* 3. Subtle Blueprint Grid Layer */}
      <GridBackground />

      {/* 4. Throttled Pointer-Aware Spotlight */}
      <Spotlight />

      {/* 5. Lightweight Grain/Noise Overlay */}
      <GrainOverlay />

      {/* Page Content Shell */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
