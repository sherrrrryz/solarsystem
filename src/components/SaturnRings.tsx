"use client";

import * as THREE from "three";

interface SaturnRingsProps {
  innerRadius: number;
  outerRadius: number;
  color: string;
}

export function SaturnRings({ innerRadius, outerRadius, color }: SaturnRingsProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}
