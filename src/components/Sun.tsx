"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const glowFragmentShader = `
  uniform vec3 glowColor;
  uniform float power;
  uniform float opacity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition)));
    float intensity = pow(rim, power);
    gl_FragColor = vec4(glowColor, intensity * opacity);
  }
`;

export function Sun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const sunTexture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Sun core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial map={sunTexture} toneMapped={false} />
      </mesh>

      {/* Inner corona - tight rim glow */}
      <mesh>
        <sphereGeometry args={[5.2, 32, 32]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            glowColor: { value: new THREE.Color(1.0, 0.85, 0.3) },
            power: { value: 2.5 },
            opacity: { value: 1.0 },
          }}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer halo - soft wide glow */}
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            glowColor: { value: new THREE.Color(1.0, 0.5, 0.05) },
            power: { value: 1.2 },
            opacity: { value: 0.6 },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Wide diffuse outer halo */}
      <mesh>
        <sphereGeometry args={[13, 32, 32]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            glowColor: { value: new THREE.Color(0.8, 0.3, 0.0) },
            power: { value: 0.8 },
            opacity: { value: 0.25 },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Sun point light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={10}
        distance={1000}
        decay={0.5}
      />
    </group>
  );
}
