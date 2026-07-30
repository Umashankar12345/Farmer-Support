const { predict, FEATURE_COLS } = require("../services/cropRecommenderService");
const { analyzeSoilHealth, calculateFertilizerDose } = require("../services/soilAndFertilizerService");

const RANGES = {
  N: [0, 300],
  P: [0, 300],
  K: [0, 300],
  temperature: [-10, 60],
  humidity: [0, 100],
  ph: [0, 14],
  rainfall: [0, 5000],
};

exports.processFarmerQuery = async (req, res) => {
  try {
    // 1. Validation for missing values
    const missing = FEATURE_COLS.filter((c) => {
      const val = req.body[c];
      return val === undefined || val === null || (typeof val === "string" && val.trim() === "");
    });

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required soil/climate parameters: ${missing.join(", ")}` });
    }

    // 2. Type conversion & safety checks
    const farmerInput = {
      N: +req.body.N,
      P: +req.body.P,
      K: +req.body.K,
      temperature: +req.body.temperature,
      humidity: +req.body.humidity,
      ph: +req.body.ph,
      rainfall: +req.body.rainfall,
    };

    for (const [key, val] of Object.entries(farmerInput)) {
      if (Number.isNaN(val)) {
        return res.status(400).json({ error: `Parameter "${key}" must be a valid number.` });
      }
      const [min, max] = RANGES[key];
      if (val < min || val > max) {
        return res.status(400).json({ error: `Parameter "${key}" (${val}) is outside valid physiological boundary (${min}-${max}).` });
      }
    }

    // 3. Step 1: Soil Health Diagnostics
    const soilReport = analyzeSoilHealth(farmerInput);

    // 4. Step 2: Crop Recommendations via Scaled KNN
    const cropRecommendations = predict(farmerInput, 5, 3);
    const topRecommendedCrop = cropRecommendations[0] ? cropRecommendations[0].crop : "MAIZE";

    // 5. Step 3: Targeted Fertilizer Calculation for Top Crop
    const fertilizerAdvisory = calculateFertilizerDose(topRecommendedCrop, farmerInput);

    // 6. Complete API response payload
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      farmerInput,
      soilHealthAnalysis: soilReport,
      recommendedCrops: cropRecommendations,
      fertilizerAdvisory: fertilizerAdvisory
    });

  } catch (err) {
    console.error("[farmerQueryController] Error processing request:", err);
    return res.status(500).json({ error: "Internal server error while executing advisory predictive modules." });
  }
};
