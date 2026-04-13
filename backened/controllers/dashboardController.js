// Sample data for dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const dashboardData = {
      weather: {
        location: "Kochi",
        condition: "light rain",
        temperature: "30°C",
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
        title: "Paddy: Brown Plant Hopper",
        description: "High humidity and dense planting can lead to outbreaks. Look for yellowing patches.",
        alertLevel: "High Alert"
      },
      schemes: [
        {
          id: 1,
          title: "PM-KISAN Scheme",
          description: "Financial support for farmers with direct benefit transfer.",
          buttonText: "Apply Now"
        },
        {
          id: 2,
          title: "PM Krishi Sinchai Yojana",
          description: "\"Per drop, more crop\" - Micro irrigation for water conservation.",
          buttonText: "Apply Now"
        },
        {
          id: 3,
          title: "Soil Health Card",
          description: "Get detailed report on your soil's health and nutrient status.",
          buttonText: "Get Details"
        }
      ],
      recommendations: [
        { id: 1, crop: "Paddy", fertilizer: "Urea", quantity: "100 kg/ha", time: "Before sowing" },
        { id: 2, crop: "Wheat", fertilizer: "DAP", quantity: "80 kg/ha", time: "During sowing" },
        { id: 3, crop: "Cotton", fertilizer: "NPK", quantity: "120 kg/ha", time: "After 30 days" }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};