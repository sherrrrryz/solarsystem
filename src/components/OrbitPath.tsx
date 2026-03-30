"use client";

import * as THREE from "three";

interface OrbitPathProps {
  radius: number;
}

export function OrbitPath({ radius }: OrbitPathProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.08, radius + 0.08, 128]} />
      <meshBasicMaterial
        color="#4488ff"
        side={THREE.DoubleSide}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}
