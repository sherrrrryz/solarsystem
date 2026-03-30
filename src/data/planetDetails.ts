export interface PlanetDetail {
  name: string;
  subtitle: string;
  description: string;
  facts: { label: string; value: string }[];
  imageUrl: string;
}

export const planetDetails: Record<string, PlanetDetail> = {
  Mercury: {
    name: "Mercury",
    subtitle: "The Swift Planet",
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface is covered with craters and looks similar to Earth's Moon. Despite being closest to the Sun, it's not the hottest planet — that title goes to Venus.",
    facts: [
      { label: "Diameter", value: "4,879 km" },
      { label: "Distance from Sun", value: "57.9 million km" },
      { label: "Orbital Period", value: "88 days" },
      { label: "Surface Temperature", value: "-180°C to 430°C" },
      { label: "Moons", value: "0" },
      { label: "Day Length", value: "59 Earth days" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg",
  },
  Venus: {
    name: "Venus",
    subtitle: "The Morning Star",
    description:
      "Venus is the second planet from the Sun and the hottest planet in our solar system. It has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid. Venus rotates in the opposite direction to most planets.",
    facts: [
      { label: "Diameter", value: "12,104 km" },
      { label: "Distance from Sun", value: "108.2 million km" },
      { label: "Orbital Period", value: "225 days" },
      { label: "Surface Temperature", value: "462°C" },
      { label: "Moons", value: "0" },
      { label: "Day Length", value: "243 Earth days" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/600px-Venus_from_Mariner_10.jpg",
  },
  Earth: {
    name: "Earth",
    subtitle: "The Blue Planet",
    description:
      "Earth is the third planet from the Sun and the only known planet to harbor life. About 71% of Earth's surface is covered with water. It has a protective magnetic field and an atmosphere rich in nitrogen and oxygen.",
    facts: [
      { label: "Diameter", value: "12,742 km" },
      { label: "Distance from Sun", value: "149.6 million km" },
      { label: "Orbital Period", value: "365.25 days" },
      { label: "Surface Temperature", value: "-89°C to 57°C" },
      { label: "Moons", value: "1" },
      { label: "Day Length", value: "24 hours" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/600px-The_Blue_Marble_%28remastered%29.jpg",
  },
  Mars: {
    name: "Mars",
    subtitle: "The Red Planet",
    description:
      "Mars is the fourth planet from the Sun and is known for its red appearance caused by iron oxide on its surface. It has the largest volcano and canyon in the solar system — Olympus Mons and Valles Marineris.",
    facts: [
      { label: "Diameter", value: "6,779 km" },
      { label: "Distance from Sun", value: "227.9 million km" },
      { label: "Orbital Period", value: "687 days" },
      { label: "Surface Temperature", value: "-140°C to 20°C" },
      { label: "Moons", value: "2" },
      { label: "Day Length", value: "24.6 hours" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg",
  },
  Jupiter: {
    name: "Jupiter",
    subtitle: "The Gas Giant",
    description:
      "Jupiter is the largest planet in our solar system — more than twice as massive as all other planets combined. It's famous for the Great Red Spot, a giant storm that has been raging for hundreds of years.",
    facts: [
      { label: "Diameter", value: "139,820 km" },
      { label: "Distance from Sun", value: "778.5 million km" },
      { label: "Orbital Period", value: "11.86 years" },
      { label: "Cloud Temperature", value: "-145°C" },
      { label: "Moons", value: "95" },
      { label: "Day Length", value: "9.9 hours" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
  },
  Saturn: {
    name: "Saturn",
    subtitle: "The Ringed Planet",
    description:
      "Saturn is the sixth planet from the Sun and is best known for its spectacular ring system made of ice and rock. It's a gas giant with a density so low that it would float in water if there were an ocean large enough.",
    facts: [
      { label: "Diameter", value: "116,460 km" },
      { label: "Distance from Sun", value: "1.43 billion km" },
      { label: "Orbital Period", value: "29.46 years" },
      { label: "Cloud Temperature", value: "-178°C" },
      { label: "Moons", value: "146" },
      { label: "Day Length", value: "10.7 hours" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg",
  },
  Uranus: {
    name: "Uranus",
    subtitle: "The Ice Giant",
    description:
      "Uranus is the seventh planet from the Sun and rotates on its side, with an axial tilt of about 98 degrees. It has a blue-green color due to methane in its atmosphere and has faint rings.",
    facts: [
      { label: "Diameter", value: "50,724 km" },
      { label: "Distance from Sun", value: "2.87 billion km" },
      { label: "Orbital Period", value: "84 years" },
      { label: "Cloud Temperature", value: "-224°C" },
      { label: "Moons", value: "28" },
      { label: "Day Length", value: "17.2 hours" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29.png/600px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29.png",
  },
  Neptune: {
    name: "Neptune",
    subtitle: "The Windiest Planet",
    description:
      "Neptune is the eighth and farthest planet from the Sun. It has the strongest winds in the solar system, reaching speeds of over 2,000 km/h. Its vivid blue color comes from methane in its atmosphere.",
    facts: [
      { label: "Diameter", value: "49,244 km" },
      { label: "Distance from Sun", value: "4.5 billion km" },
      { label: "Orbital Period", value: "165 years" },
      { label: "Cloud Temperature", value: "-214°C" },
      { label: "Moons", value: "16" },
      { label: "Day Length", value: "16.1 hours" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/600px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
  },
};
