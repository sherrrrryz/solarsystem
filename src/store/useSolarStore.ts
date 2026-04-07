"use client";

import { create } from "zustand";
import * as THREE from "three";

interface SolarState {
  selectedPlanet: string | null;
  paused: boolean;
  frozenTime: number;
  targetPosition: THREE.Vector3 | null;
  planetPosition: THREE.Vector3 | null;
  cameraAnimating: boolean;

  selectPlanet: (name: string, position: THREE.Vector3, currentTime: number) => void;
  clearSelection: () => void;
  setCameraAnimating: (v: boolean) => void;
}

export const useSolarStore = create<SolarState>((set) => ({
  selectedPlanet: null,
  paused: false,
  frozenTime: 0,
  targetPosition: null,
  planetPosition: null,
  cameraAnimating: false,

  selectPlanet: (name, position, currentTime) =>
    set({
      selectedPlanet: name,
      paused: true,
      frozenTime: currentTime,
      cameraAnimating: true,
      planetPosition: position.clone(),
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
      // cameraAnimating stays true — CameraAnimator will set it false when done
    }),

  setCameraAnimating: (v) => set({ cameraAnimating: v }),
}));
