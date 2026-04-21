import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useLiveStats } from '../../hooks/useLiveStats';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import StatCard from './components/StatCard';
import WeatherStrip from './components/WeatherStrip';
import CropHealthBars from './components/CropHealthBars';
import AlertFeed from './components/AlertFeed';
import PerformanceTicker from './components/PerformanceTicker';
import FarmMiniMap from './components/FarmMiniMap';
import MandiWidget from './components/MandiWidget';
import SoilMiniWidget from './components/SoilMiniWidget';
import SchemeMiniWidget from './components/SchemeMiniWidget';

export default function Dashboard() {
  const { stats, loading } = useLiveStats(4000);
  const { forecast } = useWeather('Rajasthan');

  if (loading && !stats.activeCrops) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6faf7]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#1a8a47] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#4a7c5c] font-bold animate-pulse text-xs tracking-widest uppercase">Initializing Digital Krishi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6faf7]">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 p-6 pb-20 overflow-y-auto">
          {/* Hero Section */}
          <header className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black text-[#0f2d1a] tracking-tight">Hey, Umashankar Kumar 👋</h1>
              <p className="text-[#4a7c5c] text-xs font-semibold mt-1">Executive Dashboard &nbsp;·&nbsp; Monday, 14 Apr 2025 &nbsp;·&nbsp; Rajasthan</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#0d5c2e] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#1a8a47] transition-all">+ Add Field</button>
              <button className="bg-[#ef4444] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:opacity-80 transition-all">📷 AI Scan</button>
              <button className="bg-[#111827] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:opacity-80 transition-all">🎙 AgriVoice</button>
            </div>
          </header>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon="🌾" value="14.2 T" label="Projected Yield" change="+8.4%" trend="up" />
            <StatCard icon="💧" value="62%" label="Soil Humidity" trend="up" />
            <StatCard icon="💰" value="₹12.5L" label="Est. Revenue" change="+14.2%" trend="up" />
            <StatCard icon="🚨" value="03" label="Active Alerts" trend="down" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left/Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <CropHealthBars liveData={stats.cropHealth} />
              <WeatherStrip forecast={forecast} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FarmMiniMap />
                <AlertFeed alerts={stats.alerts} />
              </div>
            </div>

            {/* Right/Secondary Column */}
            <div className="lg:col-span-1 space-y-6">
              <SchemeMiniWidget />
              <SoilMiniWidget />
              <MandiWidget />

              {/* Dashboard Embedded Chat Mock */}
              <div className="bg-[#1a2e1a] p-5 rounded-3xl shadow-xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#22c55e] rounded-lg flex items-center justify-center font-black">AV</div>
                  <div>
                    <p className="text-xs font-bold">AgriVoice Chat</p>
                    <p className="text-[9px] text-[#86efac] font-bold">● Online · Gemini AI</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 mb-3 text-[11px] leading-relaxed">
                  Namaste! 🙏 I'm AgriVoice. Ask about crops, weather, fertilizers or pests.
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-[10px] outline-none focus:border-[#22c55e]"
                    placeholder="Ask anything..."
                  />
                  <button className="bg-[#22c55e] w-10 h-10 rounded-xl flex items-center justify-center font-bold">→</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <PerformanceTicker metrics={stats.performance} />
    </div>
  );
}