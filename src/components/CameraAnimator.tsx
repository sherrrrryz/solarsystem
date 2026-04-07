"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSolarStore } from "@/store/useSolarStore";

const INITIAL_POSITION = new THREE.Vector3(0, 50, 100);
const INITIAL_LOOKAT = new THREE.Vector3(0, 0, 0);
const LERP_SPEED = 2.0;
const ARRIVAL_THRESHOLD = 0.5;

export function CameraAnimator() {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls) as any;
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const returningHome = useRef(false);

  const selectedPlanet = useSolarStore((s) => s.selectedPlanet);
  const targetPosition = useSolarStore((s) => s.targetPosition);
  const planetPosition = useSolarStore((s) => s.planetPosition);
  const setCameraAnimating = useSolarStore((s) => s.setCameraAnimating);
  const prevSelected = useRef<string | null>(null);

  useFrame((_, delta) => {
    const t = Math.min(LERP_SPEED * delta, 1);

    if (prevSelected.current && !selectedPlanet) {
      returningHome.current = true;
    }
    prevSelected.current = selectedPlanet;

    if (selectedPlanet && targetPosition && planetPosition) {
      camera.position.lerp(targetPosition, t);
      currentLookAt.current.lerp(planetPosition, t);
      camera.lookAt(currentLookAt.current);
      if (controls) controls.target.copy(currentLookAt.current);
    } else if (returningHome.current) {
      camera.position.lerp(INITIAL_POSITION, t);
      currentLookAt.current.lerp(INITIAL_LOOKAT, t);
      camera.lookAt(currentLookAt.current);
      if (controls) controls.target.copy(currentLookAt.current);

      if (camera.position.distanceTo(INITIAL_POSITION) < ARRIVAL_THRESHOLD) {
        returningHome.current = false;
        // Snap to exact position and re-enable OrbitControls
        camera.position.copy(INITIAL_POSITION);
        currentLookAt.current.copy(INITIAL_LOOKAT);
        if (controls) {
          controls.target.copy(INITIAL_LOOKAT);
          controls.update();
        }
        setCameraAnimating(false);
      }
    }
  });

  return null;
}
