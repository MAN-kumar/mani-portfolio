"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContentGraph } from "./ContentGraph";
import { SceneFallback } from "./SceneFallback";

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!webGlSupported) {
    return <SceneFallback className={className} />;
  }

  return (
    <ErrorBoundary fallback={<SceneFallback className={className} />}>
      <div className={`relative w-full h-full min-h-[320px] lg:min-h-[380px] pointer-events-auto select-none ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          aria-hidden="true"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#38bdf8" />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#818cf8" />
          <ContentGraph isMobile={isMobile} />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
};
