// backend/controllers/cropRecommenderController.js

const { predict, FEATURE_COLS } = require("../services/cropRecommenderService");

exports.recommendCrops = async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    const missing = FEATURE_COLS.filter((c) => req.body[c] === undefined || req.body[c] === null || req.body[c] === "");
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const farmerInput = { N: +N, P: +P, K: +K, temperature: +temperature, humidity: +humidity, ph: +ph, rainfall: +rainfall };

    for (const [key, val] of Object.entries(farmerInput)) {
      if (Number.isNaN(val)) {
        return res.status(400).json({ error: `Field "${key}" must be a valid number.` });
      }
    }

    const results = predict(farmerInput, 5, 5);

    res.json({
      inputs: farmerInput,
      recommendations: results,
      note: "Match % from a K-Nearest-Neighbors model trained on 2,200 real soil/climate/crop records.",
    });
  } catch (err) {
    console.error("[cropRecommenderController] Error:", err.message);
    res.status(500).json({ error: "Failed to generate crop recommendations." });
  }
};
