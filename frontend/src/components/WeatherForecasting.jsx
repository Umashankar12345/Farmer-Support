import React, { useState, useEffect } from "react";

export default function WeatherForecasting() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading live weather data...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Weather & Forecasting</h1>
          <p className="text-sm text-gray-500">Real-time localized agricultural weather data for {weather.location}</p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
          LIVE METEO API
        </span>
      </div>

      {/* Current Conditions Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400 font-bold block mb-1">TEMPERATURE</span>
          <span className="text-2xl font-bold text-gray-800">{weather.current.temperature}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400 font-bold block mb-1">HUMIDITY</span>
          <span className="text-2xl font-bold text-blue-600">{weather.current.humidity}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400 font-bold block mb-1">RAINFALL</span>
          <span className="text-2xl font-bold text-cyan-600">{weather.current.precipitation}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400 font-bold block mb-1">WIND SPEED</span>
          <span className="text-2xl font-bold text-slate-700">{weather.current.windSpeed}</span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl mb-6">
        <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Farming Action Advisory</h3>
        <p className="text-sm text-emerald-900 mt-1">{weather.agriAdvisory}</p>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-700 uppercase mb-4">7-Day Agricultural Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
          {weather.forecast.map((day, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-lg border border-gray-100 text-xs">
              <span className="font-bold text-gray-700 block mb-1">{day.date.slice(5)}</span>
              <div className="text-rose-500 font-semibold">{day.maxTemp}</div>
              <div className="text-blue-500 text-[11px]">{day.minTemp}</div>
              <div className="text-gray-400 text-[10px] mt-1">Rain: {day.rainSum}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
