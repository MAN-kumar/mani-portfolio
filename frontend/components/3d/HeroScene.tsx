"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContentGraph } from "./ContentGraph";
import { SceneFallback } from "./SceneFallback";
import { useTheme } from "@/components/theme/ThemeProvider";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL 3D Render fallback triggered:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export const HeroScene: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [webGlSupported] = useState<boolean>(() => checkWebGLSupport());
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { activeThemeConfig } = useTheme();

  useEffect(() => {
    let animFrameId: number | null = null;
    const checkMobile = () => {
      if (animFrameId !== null) return;
      animFrameId = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 768);
        animFrameId = null;
      });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  if (!webGlSupported) {
    return <SceneFallback className={className} />;
  }

  return (
    <ErrorBoundary fallback={<SceneFallback className={className} />}>
      <div className={`relative w-full h-[280px] sm:h-[380px] lg:h-[480px] min-h-[280px] pointer-events-auto select-none ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          aria-hidden="true"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} color={activeThemeConfig.primary} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} color={activeThemeConfig.secondary} />
          <ContentGraph isMobile={isMobile} primaryColor={activeThemeConfig.primary} secondaryColor={activeThemeConfig.secondary} />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
};
