"use client";

import { useMemo } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 glowColor;
  uniform float coefficient;
  uniform float power;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir = normalize(-vPosition);
    float intensity = pow(coefficient - dot(vNormal, viewDir), power);
    intensity = clamp(intensity, 0.0, 1.0);
    gl_FragColor = vec4(glowColor, intensity);
  }
`;

interface AtmosphereProps {
  radius: number;
  scale: number;
  color: string;
}

export function Atmosphere({ radius, scale, color }: AtmosphereProps) {
  const uniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color(color) },
      coefficient: { value: 0.5 },
      power: { value: 3.0 },
    }),
    [color]
  );

  return (
    <mesh scale={[scale, scale, scale]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
