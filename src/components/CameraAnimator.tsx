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
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  // Track whether we're actively animating back to initial position
  const returningHome = useRef(false);

  const selectedPlanet = useSolarStore((s) => s.selectedPlanet);
  const targetPosition = useSolarStore((s) => s.targetPosition);
  const planetPosition = useSolarStore((s) => s.planetPosition);
  const prevSelected = useRef<string | null>(null);

  useFrame((_, delta) => {
    const t = Math.min(LERP_SPEED * delta, 1);

    // Detect transition from selected -> deselected
    if (prevSelected.current && !selectedPlanet) {
      returningHome.current = true;
    }
    prevSelected.current = selectedPlanet;

    if (selectedPlanet && targetPosition && planetPosition) {
      // Fly to planet
      camera.position.lerp(targetPosition, t);
      currentLookAt.current.lerp(planetPosition, t);
      camera.lookAt(currentLookAt.current);
    } else if (returningHome.current) {
      // Animate back to initial position
      camera.position.lerp(INITIAL_POSITION, t);
      currentLookAt.current.lerp(INITIAL_LOOKAT, t);
      camera.lookAt(currentLookAt.current);

      // Stop animating once close enough — hand control back to OrbitControls
      if (camera.position.distanceTo(INITIAL_POSITION) < ARRIVAL_THRESHOLD) {
        returningHome.current = false;
      }
    }
    // When not selected and not returning: do nothing, let OrbitControls drive
  });

  return null;
}
