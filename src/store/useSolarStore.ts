"use client";

import { create } from "zustand";
import * as THREE from "three";

interface SolarState {
  selectedPlanet: string | null;
  paused: boolean;
  // Frozen elapsed time when paused (so planets hold position)
  frozenTime: number;
  // Target position for camera to fly to
  targetPosition: THREE.Vector3 | null;
  // Planet world position when selected
  planetPosition: THREE.Vector3 | null;

  selectPlanet: (name: string, position: THREE.Vector3, currentTime: number) => void;
  clearSelection: () => void;
}

export const useSolarStore = create<SolarState>((set) => ({
  selectedPlanet: null,
  paused: false,
  frozenTime: 0,
  targetPosition: null,
  planetPosition: null,

  selectPlanet: (name, position, currentTime) =>
    set({
      selectedPlanet: name,
      paused: true,
      frozenTime: currentTime,
      planetPosition: position.clone(),
      // Camera offset: to the right and slightly above, so planet sits on the left half
      targetPosition: new THREE.Vector3(
        position.x + 8,
        position.y + 3,
        position.z + 8
      ),
    }),

  clearSelection: () =>
    set({
      selectedPlanet: null,
      paused: false,
      frozenTime: 0,
      targetPosition: null,
      planetPosition: null,
    }),
}));
