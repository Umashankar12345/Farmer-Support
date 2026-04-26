const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/forecast', async (req, res) => {
  try {
    const { lat = 26.9124, lon = 75.7873, location = 'Jaipur, Rajasthan' } = req.query;
    
    // Fetch real weather from Open-Meteo (Free, No Key needed)
    // In production with OpenWeatherMap: use `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`);
    
    const current = weatherRes.data.current;
    
    // Map WMO codes to conditions
    const WMO_MAP = { 0: 'Sunny', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast', 45: 'Fog', 51: 'Drizzle', 61: 'Rain', 71: 'Snow', 95: 'Thunderstorm' };
    const condition = WMO_MAP[current.weather_code] || 'Clear';

    const weatherData = {
      location,
      current: {
        temp: Math.round(current.temperature_2m),
        condition: condition,
        wind: `${current.wind_speed_10m}km/h`,
        humidity: `${current.relative_humidity_2m}%`,
        rain: current.precipitation
      },
      daily: [
        { day: 'Mon', temp: '32°C', icon: '☀️', suitability: 'High' },
        { day: 'Tue', temp: '30°C', icon: '⛅', suitability: 'High' },
        { day: 'Wed', temp: '28°C', icon: '🌦️', suitability: 'Medium' },
        { day: 'Thu', temp: '31°C', icon: '☀️', suitability: 'High' },
        { day: 'Fri', temp: '33°C', icon: '☀️', suitability: 'High' }
      ],
      cropSuitability: {
        wheat: current.precipitation > 0 ? { status: 'Optimal', action: 'Natural irrigation active' } : { status: 'Good', action: 'Standard irrigation needed' },
        mustard: current.relative_humidity_2m > 70 ? { status: 'Warning', action: 'Watch for White Rust/Aphids' } : { status: 'Healthy', action: 'Ideal growth conditions' },
        millet: { status: 'Optimal', action: 'No immediate action' }
      }
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch real-time weather' });
  }
});

module.exports = router;
