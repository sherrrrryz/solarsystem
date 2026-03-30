"use client";

import { OrbitControls } from "@react-three/drei";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { StarField } from "./StarField";
import { CameraAnimator } from "./CameraAnimator";
import { planets } from "@/data/planets";
import { useSolarStore } from "@/store/useSolarStore";

export function SolarSystem() {
  const selectedPlanet = useSolarStore((s) => s.selectedPlanet);

  return (
    <>
      <ambientLight intensity={0.1} />
      <Sun />
      {planets.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}
      <StarField />
      <CameraAnimator />
      <OrbitControls
        makeDefault
        enablePan={!selectedPlanet}
        enableZoom={!selectedPlanet}
        enableRotate={!selectedPlanet}
        minDistance={10}
        maxDistance={300}
        dampingFactor={0.08}
        rotateSpeed={0.5}
      />
    </>
  );
}
