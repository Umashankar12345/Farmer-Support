const User = require("../models/User");
const { fetchForecast, generateCropTimingAdvisory } = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.coordinates || !user.coordinates.lat) {
      return res.status(400).json({
        error: "No location on file. Please complete signup with your village/location first.",
      });
    }

    const forecast = await fetchForecast(user.coordinates.lat, user.coordinates.lon);

    const Field = require("../models/Field");
    const fields = await Field.find({ userId });
    
    let cropStage = null;
    if (fields.length > 0) {
      // Pick the first field to drive the advisory (could be expanded to all fields)
      const field = fields[0];
      
      const getCropDurationDays = (cropName) => {
        const table = { 'wheat': 120, 'mustard': 110, 'millet': 90, 'cotton': 160, 'soybean': 100, 'rice': 130 };
        return table[cropName?.toLowerCase()] || 100;
      };
      
      const calculateGrowthProgress = (sowingDate, cropName) => {
        if (!sowingDate) return 0;
        const duration = getCropDurationDays(cropName);
        const daysSinceSowing = (Date.now() - new Date(sowingDate).getTime()) / (1000 * 60 * 60 * 24);
        return Math.min(100, Math.max(0, Math.round((daysSinceSowing / duration) * 100)));
      };
      
      const growth = calculateGrowthProgress(field.sowingDate, field.cropName);
      if (growth > 90) cropStage = "ready_to_harvest";
      else if (growth > 50) cropStage = "needs_spraying";
    }

    const advisories = generateCropTimingAdvisory(forecast, cropStage);

    res.json({
      location: user.location, // the matched place name from geocoding
      forecast,
      advisories,
    });
  } catch (err) {
    console.error("[weatherController] Failed to fetch forecast:", err.message);
    res.status(502).json({
      error: "Could not reach the weather service right now. Please try again shortly.",
    });
  }
};
