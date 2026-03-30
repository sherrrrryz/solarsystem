"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Sun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.05;
      glowRef.current.rotation.x += delta * 0.03;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Inner core - bright hot center */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[4.8, 48, 48]} />
        <meshStandardMaterial
          color="#fff5cc"
          emissive="#FDB813"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Mid glow layer - adds depth and warmth */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[5.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.35}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Outer glow - soft corona */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[6.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C00"
          transparent
          opacity={0.1}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Light source */}
      <pointLight position={[0, 0, 0]} intensity={1000} color="#ffff99" />
    </group>
  );
}
