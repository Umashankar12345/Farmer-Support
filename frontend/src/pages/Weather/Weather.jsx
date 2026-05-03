import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../../services/api';

const LOCATIONS = [
  { name: 'Jaipur, Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Chandigarh, Punjab', lat: 30.7333, lon: 76.7794 },
  { name: 'Lucknow, UP', lat: 26.8467, lon: 80.9462 },
  { name: 'Bhopal, MP', lat: 23.2599, lon: 77.4126 },
  { name: 'Mumbai, Maharashtra', lat: 19.0760, lon: 72.8777 }
];

const WEATHER_ICONS = {
  'Sunny': '☀️', 'Mainly Clear': '🌤️', 'Partly Cloudy': '⛅', 'Overcast': '☁️',
  'Fog': '🌫️', 'Drizzle': '🌧️', 'Rain': '🌧️', 'Snow': '❄️', 'Thunderstorm': '⛈️', 'Clear': '☀️'
};

export default function WeatherPage() {
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await weatherAPI.getForecast(selectedLoc.lat, selectedLoc.lon);
        // We pass the name locally since the backend defaults to Jaipur if not passed
        data.location = selectedLoc.name;
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [selectedLoc]);

  return (
    <>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>Weather & Forecasting</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Real-time localized agricultural weather data</div>
        </div>
        <div>
          <select 
            className="input-v2"
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontWeight: 700, fontSize: '12px' }}
            value={selectedLoc.name}
            onChange={(e) => {
              const loc = LOCATIONS.find(l => l.name === e.target.value);
              if (loc) setSelectedLoc(loc);
            }}
          >
            {LOCATIONS.map(loc => (
              <option key={loc.name} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
          <div className="spin" style={{ width: '40px', height: '40px', borderWidth: '4px', borderTopColor: 'var(--g2)', borderColor: 'rgba(0,0,0,0.1)' }}></div>
          <div style={{ marginTop: '16px', fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Fetching Real-Time Satellite Data...</div>
        </div>
      ) : error ? (
        <div className="card" style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
          <div style={{ fontWeight: 800, fontSize: '14px' }}>{error}</div>
        </div>
      ) : weatherData ? (
        <>
          <div className="grid grid-2" style={{ marginBottom: '24px' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, var(--g2), var(--g1))', color: '#fff', border: 'none', position: 'relative', overflow: 'hidden' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div>
                     <div style={{ fontSize: '10px', opacity: 0.8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{weatherData.location}</div>
                     <div style={{ fontSize: '48px', fontWeight: 800, margin: '8px 0', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>{weatherData.current.temp}°C</div>
                     <div style={{ fontSize: '16px', fontWeight: 700 }}>{weatherData.current.condition}</div>
                  </div>
                  <div style={{ fontSize: '72px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
                    {WEATHER_ICONS[weatherData.current.condition] || '☀️'}
                  </div>
               </div>
               <div style={{ display: 'flex', gap: '24px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)', position: 'relative', zIndex: 2 }}>
                  <div>
                     <div style={{ fontSize: '9px', opacity: 0.7, fontWeight: 800 }}>HUMIDITY</div>
                     <div style={{ fontSize: '14px', fontWeight: 800 }}>{weatherData.current.humidity}</div>
                  </div>
                  <div>
                     <div style={{ fontSize: '9px', opacity: 0.7, fontWeight: 800 }}>WIND SPEED</div>
                     <div style={{ fontSize: '14px', fontWeight: 800 }}>{weatherData.current.wind}</div>
                  </div>
                  <div>
                     <div style={{ fontSize: '9px', opacity: 0.7, fontWeight: 800 }}>PRECIPITATION</div>
                     <div style={{ fontSize: '14px', fontWeight: 800 }}>{weatherData.current.rain} mm</div>
                  </div>
               </div>
            </div>

            <div className="card">
               <div className="card-title">Agricultural Suitability</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--g5)', borderRadius: '10px' }}>
                     <div>
                       <div style={{ fontWeight: 800, fontSize: '12px' }}>Wheat Sowing</div>
                       <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{weatherData.cropSuitability.wheat.action}</div>
                     </div>
                     <div className={`badge ${weatherData.cropSuitability.wheat.status === 'Optimal' ? 'b-green' : 'b-amber'}`}>
                       {weatherData.cropSuitability.wheat.status.toUpperCase()}
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--g5)', borderRadius: '10px' }}>
                     <div>
                       <div style={{ fontWeight: 800, fontSize: '12px' }}>Mustard Health</div>
                       <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{weatherData.cropSuitability.mustard.action}</div>
                     </div>
                     <div className={`badge ${weatherData.cropSuitability.mustard.status === 'Healthy' ? 'b-green' : 'b-amber'}`}>
                       {weatherData.cropSuitability.mustard.status.toUpperCase()}
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--g5)', borderRadius: '10px' }}>
                     <div>
                       <div style={{ fontWeight: 800, fontSize: '12px' }}>Millet Spraying</div>
                       <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{weatherData.cropSuitability.millet.action}</div>
                     </div>
                     <div className={`badge ${weatherData.cropSuitability.millet.status === 'Optimal' ? 'b-green' : 'b-amber'}`}>
                       {weatherData.cropSuitability.millet.status.toUpperCase()}
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="card">
             <div className="card-title">5-Day Agricultural Forecast</div>
             <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', flexWrap: 'wrap', gap: '8px' }}>
                {weatherData.daily.map((f, i) => (
                  <div key={i} style={{ flex: 1, minWidth: '60px', padding: '16px 8px', background: 'var(--g5)', borderRadius: '12px' }}>
                     <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', marginBottom: '8px' }}>{f.day.toUpperCase()}</div>
                     <div style={{ fontSize: '28px', marginBottom: '8px' }}>{f.icon}</div>
                     <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>{f.temp}</div>
                     <div style={{ fontSize: '9px', fontWeight: 700, color: f.suitability === 'High' ? 'var(--g2)' : 'var(--amber)' }}>{f.suitability} FIT</div>
                  </div>
                ))}
             </div>
          </div>
        </>
      ) : null}
    </>
  );
}
