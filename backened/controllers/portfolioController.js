// backend/controllers/portfolioController.js

const Field = require('../models/Field');

exports.getFarmerPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;
    const fields = await Field.find({ userId }).sort({ createdAt: -1 });

    const mapSoilLevelToNumber = (level) => {
      switch (level) {
        case 'High': return 80;
        case 'Medium': return 50;
        case 'Low': return 30;
        default: return 50;
      }
    };

    const farms = fields.map(field => {
      let healthScore = 80;
      if (field.healthHistory && field.healthHistory.length > 0) {
        healthScore = field.healthHistory[field.healthHistory.length - 1].score;
      }

      return {
        id: field._id.toString(),
        name: field.fieldName,
        location: field.location || 'Unknown Location',
        areaAcres: (field.areaHectares * 2.47105).toFixed(1), // convert hectares to acres
        currentCrop: field.cropName,
        healthScore: healthScore,
        lastTested: field.lastSoilTestDate ? field.lastSoilTestDate.toISOString().split('T')[0] : 'Not Tested',
        soilMetrics: {
          N: mapSoilLevelToNumber(field.lastSoilTestResults?.nitrogen),
          P: mapSoilLevelToNumber(field.lastSoilTestResults?.phosphorus),
          K: mapSoilLevelToNumber(field.lastSoilTestResults?.potassium),
          ph: field.lastSoilTestResults?.pH || 7.0
        }
      };
    });

    // Default mock trends if no history exists across fields
    let soilTrends = [
      { month: "Jan", N: 40, P: 25, K: 30, ph: 6.2 },
      { month: "Feb", N: 52, P: 28, K: 32, ph: 6.4 },
      { month: "Mar", N: 60, P: 35, K: 38, ph: 6.5 },
      { month: "Apr", N: 70, P: 40, K: 36, ph: 6.6 },
      { month: "May", N: 65, P: 38, K: 35, ph: 6.7 },
      { month: "Jun", N: 75, P: 42, K: 40, ph: 6.8 }
    ];

    const actionableTasks = [];
    fields.forEach((field, index) => {
      if (!field.lastSoilTestDate) {
        actionableTasks.push({
          id: `task_${index}_1`,
          type: "Soil Test",
          priority: "High",
          message: `No recent soil test found for ${field.fieldName}. Please test soil.`
        });
      } else if (field.lastSoilTestResults?.nitrogen === 'Low') {
        actionableTasks.push({
          id: `task_${index}_2`,
          type: "Fertilizer",
          priority: "High",
          message: `Apply nitrogen-rich fertilizer to ${field.fieldName} to address low nitrogen.`
        });
      }
    });

    const portfolioData = {
      activeFieldsCount: fields.length,
      farms: farms,
      soilTrends: soilTrends,
      actionableTasks: actionableTasks
    };

    return res.status(200).json(portfolioData);
  } catch (err) {
    console.error("[portfolioController] Error:", err);
    return res.status(500).json({ error: "Failed to fetch portfolio data." });
  }
};
