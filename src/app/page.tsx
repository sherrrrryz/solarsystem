"use client";

import { Canvas } from "@react-three/fiber";
import { SolarSystem } from "@/components/SolarSystem";
import { PlanetDetailPanel } from "@/components/PlanetDetailPanel";

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <SolarSystem />
      </Canvas>
      <PlanetDetailPanel />
    </div>
  );
}
