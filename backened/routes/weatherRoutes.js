const express = require('express');
const router = express.Router();

// Mock Weather Data with enriched crop advisory
router.get('/forecast', async (req, res) => {
  const { location = 'Rajasthan' } = req.query;
  
  // Simulated Enriched Response
  const weatherData = {
    location,
    current: {
      temp: 31,
      condition: 'Sunny',
      wind: '12km/h',
      humidity: '45%'
    },
    daily: [
      { day: 'Mon', temp: '32°C', icon: '☀️', suitability: 'High' },
      { day: 'Tue', temp: '30°C', icon: '⛅', suitability: 'High' },
      { day: 'Wed', temp: '28°C', icon: '🌦️', suitability: 'Medium' },
      { day: 'Thu', temp: '31°C', icon: '☀️', suitability: 'High' },
      { day: 'Fri', temp: '33°C', icon: '☀️', suitability: 'High' },
      { day: 'Sat', temp: '34°C', icon: '☀️', suitability: 'High' },
      { day: 'Sun', temp: '32°C', icon: '⛅', suitability: 'High' }
    ],
    soilTemperature: { 5: 28, 10: 26, 20: 24 }, // depth in cm
    cropSuitability: {
      wheat: { status: 'Excellent', action: 'Ideal for tillering' },
      mustard: { status: 'Monitor', action: 'Watch for aphids due to humidity' },
      millet: { status: 'Optimal', action: 'Good for irrigation' }
    }
  };

  res.json(weatherData);
});

module.exports = router;
