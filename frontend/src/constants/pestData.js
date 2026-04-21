export const PEST_INTENSITY = {
  RJ: {
    name: "Rajasthan",
    intensity: "High",
    color: "#dc2626",
    alerts: [
      { id: 1, name: "Desert Locust Swarm", crop: "Mustard, Wheat", level: "Critical", action: "Aerial spray (Malathion 95% ULV)", area: "Bikaner, Jaisalmer" },
      { id: 2, name: "Spotted Pod Borer", crop: "Pulses", level: "High", action: "Spray Emamectin benzoate", area: "Jaipur, Kota" }
    ]
  },
  PB: {
    name: "Punjab",
    intensity: "Medium",
    color: "#d97706",
    alerts: [
      { id: 3, name: "Cotton Whitefly", crop: "Cotton", level: "Medium", action: "Neem oil spray / Yellow sticky traps", area: "Bathinda, Manson" },
      { id: 4, name: "Pink Bollworm", crop: "BT Cotton", level: "High", action: "Pheromone traps / Spinosad 45SC", area: "Ludhiana" }
    ]
  },
  MH: {
    name: "Maharashtra",
    intensity: "High",
    color: "#dc2626",
    alerts: [
      { id: 5, name: "Fall Armyworm", crop: "Maize", level: "Critical", action: "Intercropping with Pigeon Pea", area: "Nashik, Satara" },
      { id: 6, name: "Sugarcane Pyrilla", crop: "Sugarcane", level: "Medium", action: "Biological control (Epiricania)", area: "Pune" }
    ]
  },
  UP: {
    name: "Uttar Pradesh",
    intensity: "Low",
    color: "#16a34a",
    alerts: [
      { id: 7, name: "Rice Stem Borer", crop: "Paddy", level: "Low", action: "Cartap hydrochloride 4G", area: "Varanasi" }
    ]
  }
};

export const PEST_CONTROLS = [
  { id: 'bio', title: 'Biological Control', desc: 'Use of natural predators like ladybugs or Trichogramma.', icon: '🐞' },
  { id: 'chem', title: 'Chemical Spray', desc: 'Targeted application of approved insecticides.', icon: '🧪' },
  { id: 'trap', title: 'Pheromone Traps', desc: 'Safe trapping methods to monitor and reduce counts.', icon: '🪤' },
  { id: 'crop', title: 'Crop Rotation', desc: 'Breaking the life cycle by changing seasonal crops.', icon: '🔄' }
];
