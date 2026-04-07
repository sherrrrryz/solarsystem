"use client";

import { Canvas } from "@react-three/fiber";
import { SolarSystem } from "@/components/SolarSystem";
import { PlanetDetailPanel } from "@/components/PlanetDetailPanel";
import * as THREE from "three";

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <SolarSystem />
      </Canvas>
      <PlanetDetailPanel />
    </div>
  );
}
