exports.getDashboardData = async (req, res) => {
  try {
    const dashboardData = {
      weather: {
        location: "Kochi",
        temperature: "30°C",
        condition: "light rain",
        wind: "11 km/h",
        humidity: "85%",
        forecast: [
          { day: "Mon", temp: "30°C" },
          { day: "Tue", temp: "31°C" },
          { day: "Wed", temp: "30°C" },
          { day: "Thu", temp: "31°C" },
          { day: "Fri", temp: "31°C" }
        ]
      },
      pestAdvisory: {
        crop: "Paddy",
        pest: "Brown Plant Hopper",
        alert: "High Alert",
        description: "High humidity and dense planting can lead to outbreaks. Look for yellowing patches.",
        recommendation: "Use appropriate pesticides and maintain proper spacing."
      },
      schemes: [
        {
          id: 1,
          name: "PM-KISAN Scheme",
          description: "Financial support for farmers.",
          link: "#"
        },
        {
          id: 2,
          name: "PM Krishi Sinchai Yojana",
          description: "\"Per drop, more crop.\"",
          link: "#"
        },
        {
          id: 3,
          name: "Soil Health Card",
          description: "Know your soil's health.",
          link: "#"
        }
      ],
      sidebarMenu: [
        { name: "Dashboard", icon: "📊", active: true },
        { name: "My Farm", icon: "🏡" },
        { name: "Farm Mechanization", icon: "🚜" },
        { name: "Crop Sown Analysis", icon: "📈" },
        { name: "Crop Production", icon: "🌾" },
        { name: "Fertilizer Recommendations", icon: "🧪" },
        { name: "Post & Disease", icon: "🦠" },
        { name: "Drought", icon: "🌵" },
        { name: "Community Forum", icon: "💬" }
      ]
    };
    
    res.json(dashboardData);
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};