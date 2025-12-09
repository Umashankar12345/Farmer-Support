export const data = {
  weather: {
    location: "Kochi",
    condition: "light rain",
    temperature: 30,
    wind: "11 km/h",
    humidity: "85%",
    forecast: [
      { day: "Mon", icon: "🌧", temp: 30 },
      { day: "Tue", icon: "🌧", temp: 31 },
      { day: "Wed", icon: "🌧", temp: 30 },
      { day: "Thu", icon: "☀️", temp: 31 },
      { day: "Fri", icon: "🌦", temp: 31 }
    ]
  },

  pest: {
    crop: "Paddy",
    name: "Brown Plant Hopper",
    description:
      "High humidity and dense planting can lead to outbreaks. Look for yellowing patches.",
    level: "High Alert"
  },

  schemes: [
    { title: "PM-KISAN Scheme", subtitle: "Financial support for farmers", button: "Apply Now" },
    { title: "PM Krishi Sinchai Yojana", subtitle: `"Per drop, more crop"`, button: "Apply Now" },
    { title: "Soil Health Card", subtitle: "Know your soil's health", button: "Get Details" }
  ]
};
