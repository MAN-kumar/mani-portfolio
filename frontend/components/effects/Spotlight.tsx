"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const Spotlight: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || isTouchDevice) return;

    let frameId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (frameId === null) {
        frameId = requestAnimationFrame(() => {
          setPosition({ x: latestX, y: latestY });
          frameId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [isTouchDevice]);

  if (shouldReduceMotion || isTouchDevice || !position) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--accent-soft), transparent 40%)`,
      }}
    />
  );
};
