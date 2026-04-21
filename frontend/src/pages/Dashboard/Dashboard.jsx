import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useLiveStats } from '../../hooks/useLiveStats';
import StatCard from './components/StatCard';
import WeatherStrip from './components/WeatherStrip';
import CropHealthBars from './components/CropHealthBars';
import AlertFeed from './components/AlertFeed';
import FarmMiniMap from './components/FarmMiniMap';
import MandiWidget from './components/MandiWidget';
import SoilMiniWidget from './components/SoilMiniWidget';
import SchemeMiniWidget from './components/SchemeMiniWidget';

export default function Dashboard() {
  const { stats, loading } = useLiveStats(4000);
  const { forecast } = useWeather('Rajasthan');

  if (loading && !stats.activeCrops) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[var(--g2)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[var(--muted)] font-bold animate-pulse text-[10px] tracking-widest uppercase">Syncing Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>Hey, Umashankar Kumar 👋</h1>
          <p style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600, marginTop: '2px' }}>Executive Dashboard · Monday, 14 Apr 2025 · Rajasthan</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-green">+ ADD FIELD</button>
          <button className="btn" style={{ background: 'var(--red)', color: '#fff' }}>📷 AI SCAN</button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <StatCard icon="🌾" value="14.2 T" label="Projected Yield" change="+8.4%" trend="up" />
        <StatCard icon="💧" value="62%" label="Soil Humidity" trend="up" />
        <StatCard icon="💰" value="₹12.5L" label="Est. Revenue" change="+14.2%" trend="up" />
        <StatCard icon="🚨" value="03" label="Active Alerts" trend="down" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Left/Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <CropHealthBars liveData={stats.cropHealth} />
          <WeatherStrip forecast={forecast} />
          <div className="grid grid-2">
            <FarmMiniMap />
            <AlertFeed alerts={stats.alerts} />
          </div>
        </div>

        {/* Right/Secondary Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SchemeMiniWidget />
          <SoilMiniWidget />
          <MandiWidget />

          {/* Quick Chat Widget */}
          <div className="card" style={{ background: 'var(--g1)', color: '#fff', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--g3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>AV</div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800 }}>AgriVoice Chat</p>
                <p style={{ fontSize: '9px', color: '#86efac', fontWeight: 700 }}>● Online Agent</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', fontSize: '11px', lineHeight: 1.5, marginBottom: '12px' }}>
              Namaste! 🙏 I'm AgriVoice. Ask me anything about your crops or weather alerts.
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0 12px', color: '#fff', fontSize: '11px', height: '36px', outline: 'none' }}
                placeholder="Ask anything..."
              />
              <button className="btn btn-green" style={{ width: '36px', height: '36px', padding: 0 }}>→</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}