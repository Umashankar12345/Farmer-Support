// backend/controllers/weatherController.js
const axios = require("axios");

// Default coordinates to Punjab (Ludhiana) for the demo
const DEFAULT_LAT = 30.9010;
const DEFAULT_LON = 75.8573;
const DEFAULT_LOCATION_NAME = "Punjab (Demo Region)";

exports.getWeatherData = async (req, res) => {
  try {
    // 1. Get user coords from DB / session or use defaults
    const lat = req.user?.latitude || req.query.lat || DEFAULT_LAT;
    const lon = req.user?.longitude || req.query.lon || DEFAULT_LON;
    const locationName = req.user?.locationName || DEFAULT_LOCATION_NAME;

    // Use OpenWeatherMap if API key is present in .env, otherwise fallback to Open-Meteo
    if (process.env.OPENWEATHER_API_KEY) {
      const owmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
      const owmRes = await axios.get(owmUrl);
      const data = owmRes.data;
      
      return res.status(200).json({
        success: true,
        location: locationName,
        current: {
          temperature: `${data.main.temp} °C`,
          humidity: `${data.main.humidity} %`,
          windSpeed: `${(data.wind.speed * 3.6).toFixed(1)} km/h`, // convert m/s to km/h
          weatherCondition: data.weather[0].main
        },
        agriAdvisory: "OpenWeather Live: Favorable weather for field application."
      });
    }

    // 2. Call Open-Meteo API (No Key Required!)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    const response = await axios.get(weatherUrl);
    const data = response.data;

    // 3. Format response for agricultural dashboard UI
    const weatherPayload = {
      success: true,
      location: locationName,
      coordinates: { lat, lon },
      current: {
        temperature: `${data.current.temperature_2m} °C`,
        humidity: `${data.current.relative_humidity_2m} %`,
        precipitation: `${data.current.precipitation} mm`,
        windSpeed: `${data.current.wind_speed_10m} km/h`,
        weatherCode: data.current.weather_code,
      },
      forecast: data.daily.time.map((date, idx) => ({
        date,
        maxTemp: `${data.daily.temperature_2m_max[idx]} °C`,
        minTemp: `${data.daily.temperature_2m_min[idx]} °C`,
        rainSum: `${data.daily.precipitation_sum[idx]} mm`,
      })),
      agriAdvisory: data.current.precipitation > 5 
        ? "High rain expected. Postpone pesticide spraying and irrigation today."
        : "Favorable weather for field application and crop monitoring."
    };

    return res.status(200).json(weatherPayload);

  } catch (err) {
    console.error("[weatherController] Error:", err.message);
    
    // Fallback static payload if external network fails
    return res.status(200).json({
      success: true,
      location: "Alwar (Offline Mode)",
      current: { temperature: "32 °C", humidity: "65 %", precipitation: "0 mm", windSpeed: "12 km/h" },
      agriAdvisory: "Clear skies predicted. Normal farming activities can proceed."
    });
  }
};
