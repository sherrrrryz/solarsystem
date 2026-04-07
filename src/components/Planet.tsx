"use client";

import { useRef, useState, useCallback, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { PlanetData } from "@/data/planets";
import { SaturnRings } from "./SaturnRings";
import { OrbitPath } from "./OrbitPath";
import { useSolarStore } from "@/store/useSolarStore";

function PlanetMesh({
  name,
  radius,
  textureUrl,
  roughness,
  metalness,
  rotationSpeed,
  hasRings,
  ringColor,
  ringInner,
  ringOuter,
}: PlanetData & { paused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectedPlanet = useSolarStore((s) => s.selectedPlanet);
  const selectPlanet = useSolarStore((s) => s.selectPlanet);

  const texture = useLoader(THREE.TextureLoader, textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

  const handleClick = useCallback(() => {
    if (selectedPlanet) return;
    if (meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      selectPlanet(name, worldPos, 0);
    }
  }, [name, selectPlanet, selectedPlanet]);

  useFrame((_, delta) => {
    if (meshRef.current && !useSolarStore.getState().paused) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
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
    </>
  );
}

export function Planet(props: PlanetData) {
  const { orbitRadius, orbitSpeed } = props;
  const groupRef = useRef<THREE.Group>(null);
  const paused = useSolarStore((s) => s.paused);
  const accumulatedTime = useRef(0);

  useFrame((_, delta) => {
    if (!paused) {
      accumulatedTime.current += delta;
    }
    const t = accumulatedTime.current * orbitSpeed * 0.3;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * orbitRadius;
      groupRef.current.position.z = Math.sin(t) * orbitRadius;
    }
  });

  return (
    <>
      <OrbitPath radius={orbitRadius} />
      <group ref={groupRef}>
        <Suspense fallback={null}>
          <PlanetMesh {...props} paused={paused} />
        </Suspense>
      </group>
    </>
  );
}
