import React from 'react';

const WeatherStrip = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span>🌦️</span> 7-Day Forecast (Rajasthan)
        </h3>
        <span className="text-xs text-gray-400">Live IMD Data</span>
      </div>
      <div className="flex justify-between gap-4 overflow-x-auto pb-2">
        {forecast.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[80px] p-3 rounded-xl hover:bg-blue-50 transition-colors group">
            <span className="text-sm text-gray-500 font-medium group-hover:text-blue-600">{day.day}</span>
            <span className="text-2xl my-2">{day.icon || '☀️'}</span>
            <span className="text-lg font-bold text-gray-900">{day.temp}</span>
            <span className="text-[10px] text-gray-400 uppercase mt-1">Suitability: High</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherStrip;
