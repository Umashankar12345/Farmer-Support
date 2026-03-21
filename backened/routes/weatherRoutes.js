const express = require('express');
const router = express.Router();

// Simple weather data for Indian cities
const weatherData = {
  'delhi': {
    temperature: 28,
    feels_like: 30,
    conditions: 'Partly Cloudy',
    humidity: 65,
    wind_speed: 12,
    pressure: 1013,
    sunrise: '06:30 AM',
    sunset: '06:45 PM',
    farming_advice: [
      '✅ Good day for fieldwork',
      '💧 Water crops early morning (5-7 AM)',
      '🌾 Suitable for wheat cultivation',
      '🌡️ Temperature is ideal for most crops'
    ]
  },
  'mumbai': {
    temperature: 30,
    feels_like: 35,
    conditions: 'Humid',
    humidity: 75,
    wind_speed: 10,
    pressure: 1010,
    sunrise: '06:45 AM',
    sunset: '07:00 PM',
    farming_advice: [
      '⚠️ High humidity: Watch for fungal diseases',
      '💧 Good day for rice irrigation',
      '🌱 Perfect for vegetable crops',
      'Avoid pesticide spray due to humidity'
    ]
  },
  'chennai': {
    temperature: 32,
    feels_like: 36,
    conditions: 'Sunny',
    humidity: 70,
    wind_speed: 15,
    pressure: 1012,
    sunrise: '06:15 AM',
    sunset: '06:30 PM',
    farming_advice: [
      '☀️ Sunny day: Good for drying crops',
      '💧 Water crops in evening',
      '🌾 Suitable for rice cultivation',
      'Use shade nets for sensitive plants'
    ]
  },
  'bangalore': {
    temperature: 26,
    feels_like: 28,
    conditions: 'Pleasant',
    humidity: 60,
    wind_speed: 14,
    pressure: 1015,
    sunrise: '06:20 AM',
    sunset: '06:35 PM',
    farming_advice: [
      '✅ Ideal weather for all crops',
      '💧 Moderate irrigation needed',
      '🌾 Good for coffee plantation',
      'Perfect day for transplanting'
    ]
  },
  'kolkata': {
    temperature: 29,
    feels_like: 33,
    conditions: 'Cloudy',
    humidity: 80,
    wind_speed: 8,
    pressure: 1011,
    sunrise: '05:45 AM',
    sunset: '06:00 PM',
    farming_advice: [
      '☁️ Cloudy: Good for transplanting',
      '⚠️ High humidity: Avoid pesticide spray',
      '🌾 Suitable for jute crops',
      'Check for waterlogging in fields'
    ]
  }
};

// Get current weather for any Indian city
router.get('/current', (req, res) => {
  try {
    const { city = 'Delhi' } = req.query;
    const cityLower = city.toLowerCase();
    
    // Get city data or default to Delhi
    const cityData = weatherData[cityLower] || weatherData['delhi'];
    
    const response = {
      success: true,
      location: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
      temperature: cityData.temperature,
      feels_like: cityData.feels_like,
      humidity: cityData.humidity,
      wind_speed: cityData.wind_speed,
      conditions: cityData.conditions,
      icon: getWeatherIcon(cityData.conditions),
      pressure: cityData.pressure,
      sunrise: cityData.sunrise,
      sunset: cityData.sunset,
      farming_advice: cityData.farming_advice,
      timestamp: new Date().toISOString(),
      note: 'Using sample data. Add OpenWeather API key for real-time weather.'
    };

    res.json(response);
    
  } catch (error) {
    console.error('Weather error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

// Get 5-day forecast
router.get('/forecast', (req, res) => {
  try {
    const { city = 'Delhi' } = req.query;
    
    // Get base temperature for the city
    const cityLower = city.toLowerCase();
    const baseTemp = weatherData[cityLower]?.temperature || 28;
    
    // Generate 5-day forecast
    const forecasts = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'][i % 5];
      const temp = baseTemp + (i % 3) - 1;
      const rain = i === 3 ? '2.5' : '0.0';
      
      forecasts.push({
        date: date.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        temp: temp,
        min_temp: temp - 3,
        max_temp: temp + 2,
        humidity: 60 + (i * 5),
        conditions: conditions,
        icon: getWeatherIcon(conditions),
        rain: rain,
        farming_alert: getFarmingAlert(conditions, rain, temp)
      });
    }

    res.json({
      success: true,
      city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
      forecasts: forecasts,
      timestamp: new Date().toISOString(),
      note: '5-day forecast using sample data'
    });
    
  } catch (error) {
    console.error('Forecast error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch forecast',
      message: error.message 
    });
  }
});

// Simple weather endpoint for compatibility
router.get('/', (req, res) => {
  try {
    const { city = 'Delhi' } = req.query;
    const cityLower = city.toLowerCase();
    const cityData = weatherData[cityLower] || weatherData['delhi'];
    
    res.json({
      success: true,
      location: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
      temperature: cityData.temperature,
      conditions: cityData.conditions,
      humidity: cityData.humidity,
      farming_advice: cityData.farming_advice,
      note: 'Weather API is working'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Helper function to get weather icon
function getWeatherIcon(conditions) {
  const conditionsLower = conditions.toLowerCase();
  
  if (conditionsLower.includes('sunny')) return '01d';
  if (conditionsLower.includes('partly cloudy')) return '02d';
  if (conditionsLower.includes('cloudy')) return '03d';
  if (conditionsLower.includes('rain')) return '10d';
  if (conditionsLower.includes('humid')) return '50d';
  if (conditionsLower.includes('pleasant')) return '01d';
  if (conditionsLower.includes('clear')) return '01d';
  return '01d';
}

// Helper function for farming alerts
function getFarmingAlert(conditions, rain, temp) {
  conditions = conditions.toLowerCase();
  const rainNum = parseFloat(rain);
  
  if (conditions.includes('thunderstorm')) {
    return "⛈️ THUNDERSTORM WARNING: Avoid field work";
  } else if (rainNum > 20) {
    return "🌧️ HEAVY RAIN ALERT: Postpone irrigation";
  } else if (temp > 38) {
    return "🔥 HEAT WARNING: Extra watering needed";
  } else if (rainNum > 0) {
    return "🌦️ Light rain: Good for crops";
  }
  
  return "Normal weather conditions";
}

module.exports = router;