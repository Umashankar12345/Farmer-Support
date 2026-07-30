// backend/controllers/portfolioController.js

exports.getFarmerPortfolio = async (req, res) => {
  try {
    const portfolioData = {
      activeFieldsCount: 2,
      farms: [
        {
          id: "farm_001",
          name: "Green Valley Plot A",
          location: "Alwar, Rajasthan",
          areaAcres: 4.5,
          currentCrop: "Mustard",
          healthScore: 88,
          lastTested: "2026-07-15",
          soilMetrics: { N: 85, P: 42, K: 40, ph: 6.8 }
        },
        {
          id: "farm_002",
          name: "East Field - Sector 4",
          location: "Ludhiana, Punjab",
          areaAcres: 6.0,
          currentCrop: "Wheat",
          healthScore: 74,
          lastTested: "2026-07-28",
          soilMetrics: { N: 50, P: 30, K: 35, ph: 7.2 }
        }
      ],
      soilTrends: [
        { month: "Jan", N: 40, P: 25, K: 30, ph: 6.2 },
        { month: "Feb", N: 52, P: 28, K: 32, ph: 6.4 },
        { month: "Mar", N: 60, P: 35, K: 38, ph: 6.5 },
        { month: "Apr", N: 70, P: 40, K: 36, ph: 6.6 },
        { month: "May", N: 65, P: 38, K: 35, ph: 6.7 },
        { month: "Jun", N: 85, P: 42, K: 40, ph: 6.8 }
      ],
      actionableTasks: [
        { id: 1, type: "Fertilizer", priority: "High", message: "Apply 15 kg/acre Urea in East Field (Low Nitrogen detected)." },
        { id: 2, type: "Irrigation", priority: "Medium", message: "Irrigation scheduled tomorrow morning based on rainfall forecast." },
        { id: 3, type: "Pest Risk", priority: "Low", message: "Humidity spike detected. High risk for powdery mildew on mustard." }
      ]
    };

    return res.status(200).json(portfolioData);
  } catch (err) {
    console.error("[portfolioController] Error:", err);
    return res.status(500).json({ error: "Failed to fetch portfolio data." });
  }
};
