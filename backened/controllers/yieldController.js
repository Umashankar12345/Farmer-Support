const HarvestLog = require('../models/HarvestLog');
const User = require('../models/User');

// Mock data for district average yield (in Tonnes/Hectare) for different crops
const DISTRICT_AVG_YIELD = {
  'Wheat': 3.5,
  'Mustard': 1.8,
  'Millet': 2.1,
  'Rice': 4.0,
  'Default': 3.0
};

exports.addHarvestLog = async (req, res) => {
  try {
    const { userId, cropName, seasonYear, yieldAmount, area, soilPH, rainfallMM } = req.body;
    
    const newLog = new HarvestLog({
      userId,
      cropName,
      seasonYear,
      yieldAmount,
      area,
      soilPH: soilPH || 6.5,
      rainfallMM: rainfallMM || 800
    });

    await newLog.save();
    res.status(201).json({ success: true, data: newLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPrediction = async (req, res) => {
  try {
    // In a real scenario, we'd use req.user.id from auth middleware. 
    // Here we'll take it from query params for prototype if provided, or default to a demo mode.
    const { userId, cropName = 'Wheat', area = 2.0, soilPH = 6.5, rainfallMM = 800 } = req.query;

    let historicalLogs = [];
    if (userId) {
       historicalLogs = await HarvestLog.find({ userId, cropName }).sort({ seasonYear: 1 });
    }

    // 1. Calculate historical average (if available)
    let historicalAvgYieldPerHa = null;
    let totalYield = 0;
    let totalArea = 0;
    
    if (historicalLogs.length > 0) {
      historicalLogs.forEach(log => {
        totalYield += log.yieldAmount;
        totalArea += log.area;
      });
      historicalAvgYieldPerHa = totalYield / totalArea;
    }

    // 2. Get District Average
    const districtAvgPerHa = DISTRICT_AVG_YIELD[cropName] || DISTRICT_AVG_YIELD['Default'];
    
    // 3. Weighted Formula for Prediction
    // Base is historical if exists, else district
    let baseYieldPerHa = historicalAvgYieldPerHa ? (historicalAvgYieldPerHa * 0.7 + districtAvgPerHa * 0.3) : districtAvgPerHa;
    
    // Agronomic multipliers (simple mock rules)
    let soilMultiplier = 1.0;
    if (soilPH >= 6.0 && soilPH <= 7.5) soilMultiplier = 1.05; // Ideal pH
    else if (soilPH < 5.5 || soilPH > 8.0) soilMultiplier = 0.90; // Poor pH
    
    let weatherMultiplier = 1.0;
    if (rainfallMM >= 500 && rainfallMM <= 1000) weatherMultiplier = 1.02;

    const predictedYieldPerHa = baseYieldPerHa * soilMultiplier * weatherMultiplier;
    const predictedTotalYield = predictedYieldPerHa * Number(area);

    res.status(200).json({
      success: true,
      data: {
        cropName,
        area: Number(area),
        predictedTotalYield: Number(predictedTotalYield.toFixed(2)),
        predictedYieldPerHa: Number(predictedYieldPerHa.toFixed(2)),
        districtAvgPerHa: districtAvgPerHa,
        districtAvgTotal: Number((districtAvgPerHa * Number(area)).toFixed(2)),
        historicalLogs
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
