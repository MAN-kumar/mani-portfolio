"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

export interface NodeData {
  id: string;
  label: string;
  category: "project" | "research" | "skill" | "tech";
  position: [number, number, number];
  connections: string[]; // IDs of connected nodes
}

export const graphNodes: NodeData[] = [
  { id: "proj-portfolio", label: "Mani Portfolio", category: "project", position: [-1.2, 0.8, 0], connections: ["tech-next", "tech-ts", "tech-django", "skill-fullstack"] },
  { id: "proj-django", label: "Django Core API", category: "project", position: [1.3, -0.6, 0.2], connections: ["tech-django", "tech-python", "tech-postgres", "skill-backend"] },
  { id: "res-explainable", label: "Explainable AI", category: "research", position: [0.8, 1.1, -0.4], connections: ["tech-python", "skill-ai", "proj-portfolio"] },
  { id: "tech-next", label: "Next.js", category: "tech", position: [-1.8, -0.5, 0.3], connections: ["proj-portfolio"] },
  { id: "tech-django", label: "Django", category: "tech", position: [0, -1.2, 0.1], connections: ["proj-portfolio", "proj-django"] },
  { id: "tech-python", label: "Python", category: "tech", position: [1.6, 0.4, -0.2], connections: ["proj-django", "res-explainable"] },
  { id: "tech-postgres", label: "PostgreSQL", category: "tech", position: [0.2, -1.6, -0.3], connections: ["proj-django"] },
  { id: "skill-fullstack", label: "Full Stack", category: "skill", position: [-0.9, -1.3, 0.2], connections: ["proj-portfolio"] },
  { id: "skill-ai", label: "Machine Learning", category: "skill", position: [-0.2, 1.4, 0.1], connections: ["res-explainable"] },
];

export const ContentGraph: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Find connected node IDs for the currently hovered node
  const activeConnectedIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const node = graphNodes.find((n) => n.id === hoveredNodeId);
    if (!node) return new Set<string>();
    return new Set<string>([node.id, ...node.connections]);
  }, [hoveredNodeId]);

  useFrame((state, delta) => {
    if (shouldReduceMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Generate line segments between connected nodes
  const lineSegments = useMemo(() => {
    const segments: Array<{
      id: string;
      start: [number, number, number];
      end: [number, number, number];
      isConnectedToHovered: boolean;
    }> = [];

    const nodeMap = new Map(graphNodes.map((n) => [n.id, n]));

    graphNodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const targetNode = nodeMap.get(targetId);
        if (targetNode) {
          const isConnectedToHovered =
            hoveredNodeId !== null &&
            (node.id === hoveredNodeId || targetNode.id === hoveredNodeId);

          segments.push({
            id: `${node.id}-${targetNode.id}`,
            start: node.position,
            end: targetNode.position,
            isConnectedToHovered,
          });
        }
      });
    });

    return segments;
  }, [hoveredNodeId]);

  const scale = isMobile ? 1.0 : 1.35;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Node Spheres */}
      {graphNodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isConnected = activeConnectedIds.has(node.id);
        const isDimmed = hoveredNodeId !== null && !isHovered && !isConnected;

        let color = "#38bdf8"; // sky cyan default
        if (node.category === "project") color = "#38bdf8";
        if (node.category === "research") color = "#f59e0b"; // amber research
        if (node.category === "skill") color = "#10b981"; // emerald skill
        if (node.category === "tech") color = "#818cf8"; // indigo tech

        const nodeRadius = isHovered ? 0.16 : 0.11;
        const opacity = isDimmed ? 0.15 : isHovered ? 1.0 : 0.75;

        return (
          <mesh
            key={node.id}
            position={node.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNodeId(node.id);
            }}
            onPointerOut={() => setHoveredNodeId(null)}
          >
            <sphereGeometry args={[nodeRadius, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isHovered ? 0.6 : 0.2}
              roughness={0.2}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}

      {/* Connection Lines */}
      {lineSegments.map((segment) => {
        const isDimmed =
          hoveredNodeId !== null && !segment.isConnectedToHovered;
        const lineColor = segment.isConnectedToHovered ? "#38bdf8" : "#334155";
        const opacity = isDimmed ? 0.08 : segment.isConnectedToHovered ? 0.8 : 0.25;

        const points = [
          new THREE.Vector3(...segment.start),
          new THREE.Vector3(...segment.end),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: opacity,
        });
        const lineObj = new THREE.Line(lineGeometry, lineMaterial);

        return <primitive key={segment.id} object={lineObj} />;
      })}
    </group>
  );
};
