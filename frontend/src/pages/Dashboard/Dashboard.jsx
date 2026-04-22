import React, { useState, useEffect, useCallback } from 'react';
import { STATE_DATA } from '../../constants/stateData';
import StatCard from './components/StatCard';
import CropHealthBars from './components/CropHealthBars';
import MandiWidget from './components/MandiWidget';
import SoilMiniWidget from './components/SoilMiniWidget';
import SchemeMiniWidget from './components/SchemeMiniWidget';
import OfflineBanner from '../../components/Offline/OfflineBanner';

export default function Dashboard() {
  const [selectedStateCode, setSelectedStateCode] = useState('RJ');
  const [weather, setWeather] = useState({ temp: '--', rain: 'fetching...', loading: true });
  const [syncing, setSyncing] = useState(false);

  const activeState = STATE_DATA[selectedStateCode];

  const fetchWeather = useCallback(async (lat, lon) => {
    setWeather(prev => ({ ...prev, loading: true, rain: 'fetching...' }));
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation&timezone=Asia%2FKolkata`);
      const data = await res.json();
      if (data.current) {
        setWeather({
          temp: `${Math.round(data.current.temperature_2m)}°C`,
          rain: data.current.precipitation > 0 ? `${data.current.precipitation.toFixed(1)} mm rain` : 'No rain now',
          loading: false
        });
      }
    } catch (err) {
      console.error('Weather fetch failed', err);
      setWeather({ temp: '--°C', rain: 'unavailable', loading: false });
    }
  }, []);

  useEffect(() => {
    fetchWeather(activeState.lat, activeState.lon);
  }, [activeState, fetchWeather]);

  const handleStateChange = (code) => {
    setSyncing(true);
    setSelectedStateCode(code);
    setTimeout(() => setSyncing(false), 500); // Realistic sync animation
  };

  return (
    <div className={`transition-opacity duration-300 ${syncing ? 'opacity-40' : 'opacity-100'}`}>
      <OfflineBanner />
      {/* Executive Header */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#d4e8d0] shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#111] tracking-tight">Hey, Umashankar Kumar 👋</h1>
          <p className="text-[11.5px] text-[#555] font-bold mt-1 uppercase tracking-wider">
            Executive Dashboard · {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · 
            <span className="text-[#14301f] ml-1">{activeState.name}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#f0fdf4] px-4 py-2.5 rounded-xl border-2 border-[#1a8a47]">
           <label htmlFor="state-select" className="text-[11px] font-black text-[#14301f] uppercase">📍 Select State</label>
           <select 
             id="state-select"
             className="bg-transparent font-bold text-[13px] text-[#14301f] outline-none cursor-pointer"
             value={selectedStateCode}
             onChange={(e) => handleStateChange(e.target.value)}
           >
             {Object.keys(STATE_DATA).map(code => (
               <option key={code} value={code}>{STATE_DATA[code].name}</option>
             ))}
           </select>
        </div>
      </header>

      {/* Top Banner Tip */}
      <div className="mb-6 bg-[#14301f] text-[#9fd4b4] py-2 px-6 rounded-3xl text-center text-[11px] font-bold tracking-wide border-b-2 border-[#1a8a47]">
        💡 {activeState.tip}
      </div>

      {/* 5-Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard icon="🌾" label="Projected Yield" value={activeState.yield} subValue={`${activeState.yc} vs last yr`} trend="up" />
        <StatCard icon="💧" label="Soil Humidity" value={activeState.hum} subValue={activeState.hn} trend="up" colorClass="text-blue-600" />
        <StatCard icon="💰" label="Est. Revenue" value={activeState.rev} subValue={`${activeState.rc} vs last yr`} trend="up" />
        <StatCard 
          icon="🌡️" 
          label="Live Temp / Rain" 
          value={weather.temp} 
          subValue={
            <div className="flex items-center gap-1.5 justify-center lg:justify-start">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {weather.rain}
            </div>
          } 
          colorClass="text-blue-500" 
        />
        <StatCard icon="🔔" label="Active Alerts" value={activeState.al} subValue={activeState.an} trend="down" colorClass="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">
          <CropHealthBars crops={activeState.crops} stateName={activeState.name} />
          <MandiWidget crops={activeState.crops.map(c => c.n.split(' ')[0])} />
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          <SchemeMiniWidget pmfbyData={activeState} />
          <SoilMiniWidget data={activeState.soil} />
          
          {/* State Helpline */}
          <div className="bg-white p-5 rounded-2xl border border-[#cde4c6] shadow-sm">
            <h4 className="text-[#14301f] text-[13px] font-black uppercase mb-3 flex items-center gap-2">📞 State Agri Helpline</h4>
            <div className="text-[12px] leading-relaxed text-[#222] font-semibold space-y-2">
               {activeState.hl.split('\n').map((line, i) => (
                 <p key={i}>{line}</p>
               ))}
               <p className="text-[10px] text-gray-400 mt-4 italic font-medium uppercase tracking-tighter">Verified by State Dept.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live System Status Bar */}
      <footer className="mt-8 flex items-center gap-6 bg-[#14301f] text-[#5ee08a] px-6 py-2 rounded-xl text-[10px] font-black tracking-widest overflow-hidden relative">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          ● SYSTEM LIVE
        </div>
        <div className="h-3 w-[1px] bg-[#1a8a47]"></div>
        <div>STATE: {selectedStateCode}</div>
        <div className="h-3 w-[1px] bg-[#1a8a47]"></div>
        <div>WEATHER: OPEN-METEO.COM</div>
        <div className="h-3 w-[1px] bg-[#1a8a47]"></div>
        <div>MSP: CACP 2024-25</div>
        <div className="ml-auto opacity-40">V3.1-STABLE · © 2026 DIGITAL KRISHI</div>
      </footer>
    </div>
  );
}