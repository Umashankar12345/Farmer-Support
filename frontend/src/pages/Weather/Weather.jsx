import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import WeatherStrip from '../Dashboard/components/WeatherStrip';
import PerformanceTicker from '../Dashboard/components/PerformanceTicker';

export default function WeatherPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/weather/forecast?days=14&location=Rajasthan')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 p-8 flex flex-col max-w-6xl mx-auto w-full">
          <header className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Weather Advisory</h1>
            <p className="text-gray-500 font-medium">14-day agricultural forecast & soil temp analysis</p>
          </header>

          <WeatherStrip forecast={data?.daily || []} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>📊</span> Crop Suitability Matrix
              </h3>
              <div className="space-y-6">
                {data?.cropSuitability ? Object.entries(data.cropSuitability).map(([crop, info]) => (
                  <div key={crop} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-gray-900 capitalize">{crop}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{info.action}</p>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${info.status === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>{info.status}</span>
                  </div>
                )) : <p className="text-sm text-gray-400">Loading suitability data...</p>}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🌡️</span> Soil Temperature Profile
              </h3>
              <div className="flex items-end justify-between h-48 gap-4 px-4">
                {[5, 10, 20, 30, 50].map((depth, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-1000"
                      style={{ height: `${(data?.soilTemperature?.[depth] || 25) * 4}px` }}
                    ></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{depth}cm</span>
                    <span className="text-xs font-black text-gray-900">{data?.soilTemperature?.[depth] || 25}°C</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-medium mt-8 text-center uppercase tracking-widest">Recommended for deep sowing: Crops preferring cooler soil.</p>
            </div>
          </div>
        </main>
      </div>
      <PerformanceTicker />
    </div>
  );
}
