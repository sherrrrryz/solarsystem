"use client";

import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { StarField } from "./StarField";
import { CameraAnimator } from "./CameraAnimator";
import { planets } from "@/data/planets";
import { useSolarStore } from "@/store/useSolarStore";

export function SolarSystem() {
  const cameraAnimating = useSolarStore((s) => s.cameraAnimating);

  return (
    <>
      {/* Scene fog - objects fade to dark navy at distance */}
      <fog attach="fog" args={[0x000814, 180, 250]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color={[0.13, 0.13, 0.13] as unknown as any} />
      {/* Blue fill light from upper-back for depth */}
      <pointLight
        position={[50, 50, -100]}
        intensity={2}
        distance={100}
        decay={1}
        color={[0.2, 0.4, 1.0] as unknown as any}
      />

      <Suspense fallback={null}>
        <Sun />
        <StarField />
      </Suspense>

      {planets.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}

      <CameraAnimator />

      <OrbitControls
        makeDefault
        enablePan={!cameraAnimating}
        enableZoom={!cameraAnimating}
        enableRotate={!cameraAnimating}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.3}
        zoomSpeed={0.8}
        minDistance={10}
        maxDistance={300}
      />

      {/* Post-processing: Bloom for sun glow and overall cinematic feel */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          radius={0.7}
        />
      </EffectComposer>
    </>
  );
}
