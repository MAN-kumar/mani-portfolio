"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

export interface InteractiveObjectProps {
  isMobile?: boolean;
}

export const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  isMobile = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const shouldReduceMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (shouldReduceMotion) return;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.15;
      wireframeRef.current.rotation.z += delta * 0.08;
    }
  });

  const scale = isMobile ? 1.2 : 1.7;

  return (
    <group scale={[scale, scale, scale]}>
      {/* Outer subtle wireframe geometry */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner solid geometry core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.8}
          emissive="#0284c7"
          emissiveIntensity={0.2}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};
