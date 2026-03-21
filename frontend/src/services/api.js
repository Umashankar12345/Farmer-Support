// src/services/api.js
const API_URL = "http://localhost:5001/api";

/**
 * Common API request helper
 */
export const apiRequest = async (endpoint, method = "GET", data = null) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  const text = await response.text();
  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    throw new Error(result.error || result.message || "Request failed");
  }

  return result;
};

// ================= AUTH APIs =================
export const authAPI = {
  signup: (userData) => apiRequest("/auth/register", "POST", userData),
  login: (credentials) => apiRequest("/auth/login", "POST", credentials),
};

// ================= DASHBOARD API =================
export const dashboardAPI = {
  getDashboard: () => apiRequest("/dashboard", "GET"),
};

// ================= WEATHER API =================
// In src/services/api.js, add these functions:

// ================= WEATHER API =================
export const weatherAPI = {
  // Get current weather
  getCurrentWeather: async (city, countryCode = 'IN') => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      if (!API_KEY || API_KEY === 'your_weather_api_key_here') {
        throw new Error('MISSING_API_KEY');
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Weather data not available');
      }

      const data = await response.json();
      return {
        location: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        condition: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].id),
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pressure: data.main.pressure
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },

  // Get weather forecast
  getWeatherForecast: async (city, countryCode = 'IN', days = 7) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      if (!API_KEY || API_KEY === 'your_weather_api_key_here') {
        throw new Error('MISSING_API_KEY');
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&cnt=${days * 8}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Forecast data not available');
      }

      const data = await response.json();

      // Group by day
      const dailyForecasts = [];
      const seenDates = new Set();

      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!seenDates.has(date)) {
          seenDates.add(date);
          dailyForecasts.push({
            date: date,
            day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            condition: item.weather[0].description,
            icon: getWeatherIcon(item.weather[0].id),
            rain: item.pop ? `${Math.round(item.pop * 100)}%` : '0%'
          });
        }
      });

      return dailyForecasts.slice(0, days);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get agricultural weather alerts
  getWeatherAlerts: async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      if (!API_KEY || API_KEY === 'your_weather_api_key_here') {
        return []; // Silent fail for alerts
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Alert data not available');
      }

      const data = await response.json();

      const alerts = [];

      // Check for extreme temperatures
      if (data.current.temp > 35) {
        alerts.push({
          type: 'heat',
          message: 'High temperature alert - Risk of heat stress for crops',
          severity: 'high'
        });
      }

      if (data.current.temp < 5) {
        alerts.push({
          type: 'cold',
          message: 'Low temperature alert - Risk of frost damage',
          severity: 'high'
        });
      }

      // Check for rain
      if (data.daily[0].rain > 10) {
        alerts.push({
          type: 'rain',
          message: 'Heavy rainfall expected - Risk of waterlogging',
          severity: 'medium'
        });
      }

      // Check for high winds
      if (data.current.wind_speed > 6) {
        alerts.push({
          type: 'wind',
          message: 'Strong winds expected - Protect young plants',
          severity: 'medium'
        });
      }

      // Check for high UV index
      if (data.current.uvi > 8) {
        alerts.push({
          type: 'uv',
          message: 'High UV index - Protect crops and workers',
          severity: 'medium'
        });
      }

      return alerts;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return []; // Return empty array if API fails
    }
  }
};

// Helper function to get weather icons
const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return '🌧️'; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
  if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
  if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere
  if (weatherId === 800) return '☀️'; // Clear
  if (weatherId > 800) return '⛅'; // Clouds
  return '🌤️'; // Default
};
// ================= FILTER APIs =================

/**
 * Apply dashboard filters
 * @param {Object} filters - Filter parameters
 * @param {string} filters.cropType - Crop type (Paddy, Wheat, etc.)
 * @param {string} filters.season - Season (Kharif, Rabi, etc.)
 * @param {string} filters.year - Year (2023, 2022, etc.)
 * @param {string} filters.location - Location (All India, State, District)
 * @param {string} filters.farmerType - Farmer type (All Farmers, Small, Large, etc.)
 * @returns {Promise<Object>} Filtered dashboard data
 */
export const applyDashboardFilters = async (filters) => {
  try {
    const { cropType, season, year, location, farmerType } = filters;

    // Using apiRequest helper for consistency
    const data = await apiRequest("/dashboard/filter", "POST", {
      crop_type: cropType,
      season,
      year,
      location,
      farmer_type: farmerType
    });

    return data;

  } catch (error) {
    console.error('Error applying filters:', error);
    throw error;
  }
};

/**
 * Get crop analysis data with filters
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Crop analysis data
 */
export const getCropAnalysisData = async (filters) => {
  try {
    const { cropType, season, year, location } = filters || {};

    const queryParams = new URLSearchParams();
    if (cropType) queryParams.append('crop_type', cropType);
    if (season) queryParams.append('season', season);
    if (year) queryParams.append('year', year);
    if (location) queryParams.append('location', location);

    const endpoint = `/crop/analysis${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return await apiRequest(endpoint, "GET");

  } catch (error) {
    console.error('Error fetching crop analysis:', error);
    throw error;
  }
};

/**
 * Get trend data over years for a specific crop
 * @param {string} cropType - Crop type
 * @param {string} season - Season
 * @param {string} location - Location
 * @returns {Promise<Object>} Trend data
 */
export const getCropTrendData = async (cropType, season, location) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('crop_type', cropType);
    queryParams.append('season', season);
    if (location) queryParams.append('location', location);

    return await apiRequest(`/crop/trend?${queryParams.toString()}`, "GET");

  } catch (error) {
    console.error('Error fetching crop trend:', error);
    throw error;
  }
};

/**
 * Get crop distribution data
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Distribution data
 */
export const getCropDistribution = async (filters) => {
  try {
    const { year, season, location } = filters || {};

    const queryParams = new URLSearchParams();
    if (year) queryParams.append('year', year);
    if (season) queryParams.append('season', season);
    if (location) queryParams.append('location', location);

    const endpoint = `/crop/distribution${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return await apiRequest(endpoint, "GET");

  } catch (error) {
    console.error('Error fetching crop distribution:', error);
    throw error;
  }
};

/**
 * Get map view data for visualization
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Map data
 */
export const getMapViewData = async (filters) => {
  try {
    const { cropType, season, year } = filters || {};

    const queryParams = new URLSearchParams();
    if (cropType) queryParams.append('crop_type', cropType);
    if (season) queryParams.append('season', season);
    if (year) queryParams.append('year', year);

    const endpoint = `/dashboard/map${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return await apiRequest(endpoint, "GET");

  } catch (error) {
    console.error('Error fetching map data:', error);
    throw error;
  }
};

// ================= COMBINED DASHBOARD FILTER API =================
export const dashboardFilterAPI = {
  // Main filter function
  applyFilters: applyDashboardFilters,

  // Specific data endpoints
  getCropAnalysis: getCropAnalysisData,
  getCropTrend: getCropTrendData,
  getCropDistribution: getCropDistribution,
  getMapData: getMapViewData,

  // Get available filter options
  getFilterOptions: async () => {
    try {
      return await apiRequest("/filters/options", "GET");
    } catch (error) {
      console.error('Error fetching filter options:', error);
      throw error;
    }
  }
};

// For backward compatibility
export default {
  authAPI,
  dashboardAPI,
  weatherAPI,
  dashboardFilterAPI,
  apiRequest
};