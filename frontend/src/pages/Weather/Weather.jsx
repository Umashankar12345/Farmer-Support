import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, Sun, CloudRain, CloudLightning, Wind, Droplets,
  Sunrise, Sunset, Thermometer, MapPin, AlertTriangle,
  RefreshCcw, Calendar, Navigation, Info, Zap, Search
} from 'lucide-react';
import { weatherAPI } from '../../services/api';
import GlassCard from '../../components/UI/GlassCard';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Ludhiana');

  const agriCities = [
    { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573 },
    { name: 'Karnal', state: 'Haryana', lat: 29.6857, lon: 76.9905 },
    { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898 },
    { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480 },
    { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 }
  ];

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherAPI.getCurrentWeather(selectedCity);
      const forecastData = await weatherAPI.getWeatherForecast(selectedCity);
      const city = agriCities.find(c => c.name === selectedCity);
      // lat/lon might need to be dynamic based on city, but for now we use the ones defined in agriCities
      const alertsData = await weatherAPI.getWeatherAlerts(city?.lat || 30.9, city?.lon || 75.8);

      setWeatherData(data);
      setForecast(forecastData);
      setAlerts(alertsData);
      setIsLive(true);
    } catch (err) {
      console.error('Weather fetch error:', err);
      if (err.message === 'MISSING_API_KEY') {
        setError('API_KEY_REQUIRED');
      } else {
        setError('Failed to fetch live weather data');
      }
      // Fallback to mock data
      setWeatherData({
        location: selectedCity,
        temperature: 28,
        feelsLike: 31,
        humidity: 65,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        icon: '⛅',
        sunrise: '06:15 AM',
        sunset: '06:45 PM',
        pressure: 1012
      });
      setForecast([
        { day: 'Tue', high: 30, low: 22, condition: 'Sunny', rain: '0%', icon: '☀️' },
        { day: 'Wed', high: 29, low: 21, condition: 'Cloudy', rain: '10%', icon: '☁️' },
        { day: 'Thu', high: 27, low: 20, condition: 'Rain', rain: '80%', icon: '🌧️' },
        { day: 'Fri', high: 26, low: 19, condition: 'Storm', rain: '90%', icon: '⛈️' },
        { day: 'Sat', high: 28, low: 21, condition: 'Sunny', rain: '0%', icon: '☀️' }
      ]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [selectedCity]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <CloudRain className="w-10 h-10 text-blue-500" /> AgriWeather Live
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Real-time meteorological insights for precision farming.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-white appearance-none cursor-pointer"
            >
              {agriCities.map(city => (
                <option key={city.name} value={city.name}>{city.name}, {city.state}</option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchWeatherData}
            className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all text-slate-600 dark:text-slate-300"
          >
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* API Key Modal/Alert */}
      {error === 'API_KEY_REQUIRED' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-3xl flex flex-col md:flex-row items-center gap-6"
        >
          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl">
            <Zap className="w-8 h-8 text-amber-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400">Live API Key Missing</h3>
            <p className="text-amber-700 dark:text-amber-500/80">
              Showing simulated data. Add your <code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">VITE_WEATHER_API_KEY</code> to <code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">.env</code> to enable live satellite feeds.
            </p>
          </div>
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-200 dark:shadow-none"
          >
            Get Key
          </a>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Card */}
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="relative overflow-hidden p-0 border-none">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
              {/* Live Indicator */}
              <div className="absolute top-6 right-8 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  {isLive ? 'Live Satellite' : 'Offline Mode'}
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="z-10">
                  <div className="flex items-center gap-2 mb-2 opacity-80">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-6xl font-black mb-1">{weatherData?.temperature}°c</h2>
                  <p className="text-2xl font-bold opacity-90">{weatherData?.condition}</p>
                  <p className="text-sm opacity-70 mt-2 flex items-center gap-2">
                    Feels like {weatherData?.feelsLike}°c • Humidity {weatherData?.humidity}%
                  </p>
                </div>
                <div className="text-9xl opacity-20 absolute -right-4 -bottom-4 select-none">
                  {weatherData?.icon}
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-slate-800/60">
              {[
                { label: 'Wind Speed', value: `${weatherData?.windSpeed} km/h`, icon: Wind, color: 'text-blue-500' },
                { label: 'Humidity', value: `${weatherData?.humidity}%`, icon: Droplets, color: 'text-cyan-500' },
                { label: 'Sunrise', value: weatherData?.sunrise, icon: Sunrise, color: 'text-amber-500' },
                { label: 'Sunset', value: weatherData?.sunset, icon: Sunset, color: 'text-orange-500' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <p className="text-lg font-bold text-slate-700 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Forecast */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" /> 5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, i) => (
                <GlassCard key={i} className="text-center p-4 hover:border-emerald-500/30 transition-all border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3">{day.day}</p>
                  <span className="text-3xl mb-3 block">{day.icon}</span>
                  <div className="flex justify-center gap-2 font-bold text-sm">
                    <span className="text-slate-700 dark:text-white">{day.high}°</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-500">{day.low}°</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 text-[10px] font-bold text-blue-500">
                    <Droplets className="w-3 h-3" /> {day.rain}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Insights */}
        <div className="space-y-8">
          {/* Alerts */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" /> Weather Alerts
            </h3>
            {alerts.length > 0 ? (
              alerts.map((alert, i) => (
                <GlassCard key={i} className={`border-l-4 ${alert.severity === 'high' ? 'border-l-rose-500 bg-rose-50/30' : 'border-l-amber-500 bg-amber-50/30'}`}>
                  <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">{alert.message}</p>
                  <span className="text-[10px] uppercase font-bold text-rose-500">{alert.type} Warning</span>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="text-center py-6 bg-emerald-50/20 border-emerald-100">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-emerald-800 dark:text-emerald-400">All Clear</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-500">No extreme weather threats detected.</p>
              </GlassCard>
            )}
          </div>

          {/* Agri Tips */}
          <GlassCard className="bg-indigo-600 text-white p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Farming Advice
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase opacity-70">Irrigation</p>
                  <p className="text-sm leading-relaxed">High evaporation rates expected today. Water early or late evening.</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-white/10">
                  <p className="text-xs font-bold uppercase opacity-70">Pest Control</p>
                  <p className="text-sm leading-relaxed">Wind speeds are low. Ideal conditions for spraying organic fertilizers.</p>
                </div>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </GlassCard>

          {/* Regional Select */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-indigo-500" /> Regional Network
            </h3>
            <div className="space-y-3">
              {agriCities.filter(c => c.name !== selectedCity).slice(0, 3).map(city => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city.name)}
                  className="w-full flex justify-between items-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="text-left">
                    <p className="font-bold text-slate-700 dark:text-white group-hover:text-blue-500 transition-colors">{city.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{city.state}</p>
                  </div>
                  <span className="text-xl opacity-50">☀️</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
