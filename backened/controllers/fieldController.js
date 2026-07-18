const Field = require('../models/Field');

// Helper: Crop duration reference table
const getCropDurationDays = (cropName) => {
  const table = {
    'wheat': 120,
    'mustard': 110,
    'millet': 90,
    'cotton': 160,
    'soybean': 100,
    'rice': 130
  };
  return table[cropName?.toLowerCase()] || 100; // default 100 days
};

function calculateGrowthProgress(sowingDate, cropName) {
  if (!sowingDate) return 0;
  const duration = getCropDurationDays(cropName);
  const daysSinceSowing = (Date.now() - new Date(sowingDate).getTime()) / (1000 * 60 * 60 * 24);
  const progress = Math.min(100, Math.round((daysSinceSowing / duration) * 100));
  return Math.max(0, progress); // Ensure no negative progress
}

function calculateHealthScore(field, mockWeather, mockNdvi, mockPestAlert) {
  let score = 100;
  
  // Soil test penalties
  if (field.lastSoilTestResults && field.lastSoilTestResults.pH) {
    const pH = field.lastSoilTestResults.pH;
    if (pH < 6 || pH > 7.5) score -= 15;
  }
  
  if (field.lastSoilTestResults && field.lastSoilTestResults.nitrogen === 'Low') {
    score -= 20;
  }

  // External feature integrations (mocked inputs per field context for demo)
  if (mockNdvi && mockNdvi < 0.5) score -= 25;
  if (mockPestAlert) score -= 15;

  return Math.max(0, score);
}

function generateActionItems(field, mockWeather) {
  const actions = [];

  // Soil testing rule
  if (field.lastSoilTestDate) {
    const daysSinceSoilTest = (Date.now() - new Date(field.lastSoilTestDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceSoilTest > 180) {
      actions.push({
        type: 'soil_test',
        icon: '🧪',
        title: 'Collect Soil Samples',
        sub: `${field.cropName} field requires nutrient re-testing (last tested ${Math.round(daysSinceSoilTest)} days ago).`
      });
    }
  } else {
    actions.push({
      type: 'soil_test',
      icon: '🧪',
      title: 'Missing Soil Test',
      sub: `No soil test recorded for ${field.cropName}. Please upload a test for better insights.`
    });
  }

  // Irrigation rule
  if (mockWeather && mockWeather.rainExpectedNext48h && field.irrigationType !== 'Rainfed') {
    actions.push({
      type: 'irrigation_alert',
      icon: '💧',
      title: 'Skip Irrigation',
      sub: `High moisture expected in ${field.location || 'your area'} — hold off on irrigation.`
    });
  }

  // Fertilizer rule
  if (field.lastSoilTestResults && field.lastSoilTestResults.nitrogen === 'Low') {
    actions.push({
      type: 'fertilizer',
      icon: '🌱',
      title: 'Apply Nitrogen Fertilizer',
      sub: `Soil nitrogen is low for your ${field.cropName} field.`
    });
  }

  return actions;
}

exports.getFields = async (req, res) => {
  try {
    const userId = req.user.id;
    // Don't use .lean() here, because we need to .save() below
    const fields = await Field.find({ userId });

    // In a full production app, these would be fetched per-field based on actual
    // coordinates (weather API), satellite models (NDVI), and pest databases.
    // We pass mock contexts here to prove the rules engine works.
    const mockWeatherContext = { rainExpectedNext48h: true }; 
    const mockNdviContext = 0.8; 
    const mockPestAlertContext = false; 

    // We use Promise.all because we might be saving documents
    const enhancedFields = await Promise.all(fields.map(async field => {
      const growth = calculateGrowthProgress(field.sowingDate, field.cropName);
      
      let status = 'Vegetative';
      if (growth > 90) status = 'Harvesting';
      else if (growth > 50) status = 'Flowering';

      const health = calculateHealthScore(field, mockWeatherContext, mockNdviContext, mockPestAlertContext);
      const actions = generateActionItems(field, mockWeatherContext);

      // --- HONEST ACCUMULATION LOGIC ---
      const today = new Date();
      const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      
      let historyChanged = false;
      
      // Check if we already recorded a score today
      if (field.healthHistory.length > 0) {
        const lastEntry = field.healthHistory[field.healthHistory.length - 1];
        const lastEntryKey = `${lastEntry.date.getFullYear()}-${lastEntry.date.getMonth()}-${lastEntry.date.getDate()}`;
        
        if (lastEntryKey !== todayKey) {
          field.healthHistory.push({ date: today, score: health });
          historyChanged = true;
        }
      } else {
        // First ever entry
        field.healthHistory.push({ date: today, score: health });
        historyChanged = true;
      }
      
      // Persist to the database if we added a new daily entry
      if (historyChanged) {
        await field.save();
      }

      return {
        ...field.toObject(),
        id: field._id.toString(), // Map for frontend convenience
        growth,
        health,
        status,
        actions
      };
    }));

    res.json({ fields: enhancedFields });
  } catch (err) {
    console.error('Error fetching fields:', err);
    res.status(500).json({ error: 'Failed to fetch fields' });
  }
};

exports.registerField = async (req, res) => {
  try {
    const { name, location, acres, soilType, irrigationType, crop, sowingDate } = req.body;
    
    if (!name || !acres || !crop || !sowingDate) {
      return res.status(400).json({ error: 'Name, acres, crop, and sowing date are required.' });
    }

    const newField = await Field.create({
      userId: req.user.id,
      fieldName: name,
      location,
      areaHectares: parseFloat(acres) * 0.404686, // convert acres to hectares
      soilType: soilType || 'Loamy',
      irrigationType: irrigationType || 'Rainfed',
      cropName: crop,
      sowingDate: new Date(sowingDate),
      healthHistory: [] // Starts genuinely empty
    });

    res.status(201).json({ message: 'Field registered successfully', field: newField });
  } catch (err) {
    console.error('Error registering field:', err);
    res.status(500).json({ error: 'Failed to register field' });
  }
};
