"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { PlanetData } from "@/data/planets";
import { SaturnRings } from "./SaturnRings";
import { OrbitPath } from "./OrbitPath";
import { useSolarStore } from "@/store/useSolarStore";

export function Planet({
  name,
  color,
  radius,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  roughness,
  metalness,
  hasRings,
  ringColor,
  ringInner,
  ringOuter,
}: PlanetData) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const paused = useSolarStore((s) => s.paused);
  const selectedPlanet = useSolarStore((s) => s.selectedPlanet);
  const selectPlanet = useSolarStore((s) => s.selectPlanet);

  // Track our own accumulated time so pause/resume is seamless
  const accumulatedTime = useRef(0);

  const handleClick = useCallback(() => {
    if (selectedPlanet) return;
    if (groupRef.current) {
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      selectPlanet(name, worldPos, 0);
    }
  }, [name, selectPlanet, selectedPlanet]);

  useFrame((state, delta) => {
    // Accumulate time only when not paused
    if (!paused) {
      accumulatedTime.current += delta;
    }
    const t = accumulatedTime.current * orbitSpeed * 0.3;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * orbitRadius;
      groupRef.current.position.z = Math.sin(t) * orbitRadius;
    }
    if (meshRef.current && !paused) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <>
      <OrbitPath radius={orbitRadius} />
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={handleClick}
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
        {hasRings && ringColor && ringInner && ringOuter && (
          <SaturnRings
            innerRadius={ringInner}
            outerRadius={ringOuter}
            color={ringColor}
          />
        )}
        {hovered && !selectedPlanet && (
          <Html
            position={[0, radius + 1.5, 0]}
            center
            style={{ pointerEvents: "none" }}
          >
            <div className="bg-black/80 text-white px-3 py-1 rounded text-sm whitespace-nowrap border border-white/20 cursor-pointer">
              {name}
            </div>
          </Html>
        )}
      </group>
    </>
  );
}
