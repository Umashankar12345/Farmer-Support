import React from 'react';

const FORECAST = [
  { day: 'Mon', temp: '32°C', icon: '☀️', suitability: 'Excellent' },
  { day: 'Tue', temp: '30°C', icon: '⛅', suitability: 'Excellent' },
  { day: 'Wed', temp: '28°C', icon: '🌦️', suitability: 'Good' },
  { day: 'Thu', temp: '31°C', icon: '☀️', suitability: 'Excellent' },
  { day: 'Fri', temp: '33°C', icon: '☀️', suitability: 'Good' },
  { day: 'Sat', temp: '34°C', icon: '☀️', suitability: 'Risky' },
  { day: 'Sun', temp: '32°C', icon: '⛅', suitability: 'Good' }
];

export default function WeatherPage() {
  return (
    <>
      <header style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '22px', fontWeight: 800 }}>Weather & Forecasting</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Localized data for Rajasthan North-West Corridor</div>
      </header>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--g2), var(--g1))', color: '#fff', border: 'none' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                 <div style={{ fontSize: '12px', opacity: 0.8, fontWeight: 800 }}>CURRENT CONDITIONS</div>
                 <div style={{ fontSize: '48px', fontWeight: 800, margin: '8px 0' }}>31°C</div>
                 <div style={{ fontSize: '14px', fontWeight: 700 }}>Mostly Sunny · Haze</div>
              </div>
              <div style={{ fontSize: '64px' }}>☀️</div>
           </div>
           <div style={{ display: 'flex', gap: '24px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                 <div style={{ fontSize: '9px', opacity: 0.6, fontWeight: 800 }}>HUMIDITY</div>
                 <div style={{ fontSize: '14px', fontWeight: 800 }}>45%</div>
              </div>
              <div>
                 <div style={{ fontSize: '9px', opacity: 0.6, fontWeight: 800 }}>WIND SPEED</div>
                 <div style={{ fontSize: '14px', fontWeight: 800 }}>12 km/h</div>
              </div>
              <div>
                 <div style={{ fontSize: '9px', opacity: 0.6, fontWeight: 800 }}>UV INDEX</div>
                 <div style={{ fontSize: '14px', fontWeight: 800 }}>High (8)</div>
              </div>
           </div>
        </div>

        <div className="card">
           <div className="card-title">Agricultural Suitability</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--g5)', borderRadius: '10px' }}>
                 <div style={{ fontWeight: 800, fontSize: '12px' }}>Sowing (Wheat)</div>
                 <div className="badge b-green">OPTIMAL</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--g5)', borderRadius: '10px' }}>
                 <div style={{ fontWeight: 800, fontSize: '12px' }}>Fertilizer Application</div>
                 <div className="badge b-green">GOOD</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--g5)', borderRadius: '10px' }}>
                 <div style={{ fontWeight: 800, fontSize: '12px' }}>Pesticide Spray</div>
                 <div className="badge b-amber">MONITOR WIND</div>
              </div>
           </div>
        </div>
      </div>

      <div className="card">
         <div className="card-title">7-Day Agricultural Forecast</div>
         <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
            {FORECAST.map((f, i) => (
              <div key={i} style={{ flex: 1, padding: '12px', borderRight: i < 6 ? '1px solid var(--border)' : 'none' }}>
                 <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '8px' }}>{f.day.toUpperCase()}</div>
                 <div style={{ fontSize: '24px', marginBottom: '8px' }}>{f.icon}</div>
                 <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>{f.temp}</div>
                 <div style={{ fontSize: '9px', fontWeight: 700, color: f.suitability === 'Excellent' ? 'var(--g2)' : 'var(--amber)' }}>{f.suitability}</div>
              </div>
            ))}
         </div>
      </div>
    </>
  );
}
