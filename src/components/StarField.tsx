"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function StarField() {
  const particlesRef = useRef<THREE.Points>(null);

  const starTexture8k = useLoader(THREE.TextureLoader, "/textures/stars_8k.jpg");
  const starTexture2k = useLoader(THREE.TextureLoader, "/textures/stars_2k.jpg");

  // Layer 3: particle stars
  const particleGeometry = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 150 + Math.random() * 100;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <>
      {/* Layer 1: Outer star sphere - 8K texture */}
      <mesh>
        <sphereGeometry args={[200, 64, 64]} />
        <meshBasicMaterial
          map={starTexture8k}
          side={THREE.BackSide}
          color={[1.2, 1.2, 1.2] as unknown as THREE.Color}
          toneMapped={false}
        />
      </mesh>

      {/* Layer 2: Inner sky sphere - 2K texture, semi-transparent for depth */}
      <mesh>
        <sphereGeometry args={[190, 64, 64]} />
        <meshBasicMaterial
          map={starTexture2k}
          side={THREE.BackSide}
          transparent
          opacity={0.3}
          color={[0.8, 0.9, 1.0] as unknown as THREE.Color}
        />
      </mesh>

      {/* Layer 3: Particle stars for extra sparkle */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.7}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </>
  );
}
