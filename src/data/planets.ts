export interface PlanetData {
  name: string;
  color: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  roughness: number;
  metalness: number;
  textureUrl: string;
  atmosphereColor?: string;
  atmosphereScale?: number;
  hasRings?: boolean;
  ringColor?: string;
  ringInner?: number;
  ringOuter?: number;
}

export const planets: PlanetData[] = [
  {
    name: "Mercury",
    color: "#B5A7A7",
    radius: 0.4,
    orbitRadius: 10,
    orbitSpeed: 1.6,
    rotationSpeed: 0.5,
    roughness: 1.0,
    metalness: 0.02,
    textureUrl: "/textures/mercury.jpg",
    // No atmosphere
  },
  {
    name: "Venus",
    color: "#E8CDA0",
    radius: 0.9,
    orbitRadius: 15,
    orbitSpeed: 1.2,
    rotationSpeed: 0.4,
    roughness: 0.6,
    metalness: 0.05,
    textureUrl: "/textures/venus.jpg",
    atmosphereColor: "#E8CDA0",
    atmosphereScale: 1.12,
  },
  {
    name: "Earth",
    color: "#6B93D6",
    radius: 1.0,
    orbitRadius: 20,
    orbitSpeed: 1.0,
    rotationSpeed: 1.0,
    roughness: 0.5,
    metalness: 0.01,
    textureUrl: "/textures/earth.jpg",
    atmosphereColor: "#6B93D6",
    atmosphereScale: 1.15,
  },
  {
    name: "Mars",
    color: "#C1440E",
    radius: 0.5,
    orbitRadius: 27,
    orbitSpeed: 0.8,
    rotationSpeed: 0.9,
    roughness: 0.75,
    metalness: 0.02,
    textureUrl: "/textures/mars.jpg",
    atmosphereColor: "#C1440E",
    atmosphereScale: 1.08,
  },
  {
    name: "Jupiter",
    color: "#D8CA9D",
    radius: 2.5,
    orbitRadius: 38,
    orbitSpeed: 0.4,
    rotationSpeed: 2.0,
    roughness: 0.9,
    metalness: 0.0,
    textureUrl: "/textures/jupiter.jpg",
    atmosphereColor: "#D8CA9D",
    atmosphereScale: 1.08,
  },
  {
    name: "Saturn",
    color: "#EAD6B8",
    radius: 2.0,
    orbitRadius: 50,
    orbitSpeed: 0.3,
    rotationSpeed: 1.8,
    roughness: 0.9,
    metalness: 0.0,
    textureUrl: "/textures/saturn.jpg",
    atmosphereColor: "#EAD6B8",
    atmosphereScale: 1.08,
    hasRings: true,
    ringColor: "#C8A95E",
    ringInner: 2.8,
    ringOuter: 4.5,
  },
  {
    name: "Uranus",
    color: "#D1E7E7",
    radius: 1.5,
    orbitRadius: 62,
    orbitSpeed: 0.2,
    rotationSpeed: 1.2,
    roughness: 0.85,
    metalness: 0.0,
    textureUrl: "/textures/uranus.jpg",
    atmosphereColor: "#D1E7E7",
    atmosphereScale: 1.1,
  },
  {
    name: "Neptune",
    color: "#5B5DDF",
    radius: 1.4,
    orbitRadius: 75,
    orbitSpeed: 0.15,
    rotationSpeed: 1.1,
    roughness: 0.85,
    metalness: 0.0,
    textureUrl: "/textures/neptune.jpg",
    atmosphereColor: "#5B5DDF",
    atmosphereScale: 1.1,
  },
];
