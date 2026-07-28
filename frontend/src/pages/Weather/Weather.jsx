import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../../services/api';

const WEATHER_ICONS = {
  'Sunny': '☀️', 'Mainly clear': '🌤️', 'Partly cloudy': '⛅', 'Overcast': '☁️',
  'Fog': '🌫️', 'Depositing rime fog': '🌫️', 'Light drizzle': '🌧️', 'Moderate drizzle': '🌧️', 'Dense drizzle': '🌧️',
  'Slight rain': '🌧️', 'Moderate rain': '🌧️', 'Heavy rain': '🌧️', 'Slight rain showers': '🌧️', 
  'Moderate rain showers': '🌧️', 'Violent rain showers': '🌧️', 'Thunderstorm': '⛈️', 
  'Thunderstorm with hail': '⛈️', 'Thunderstorm with heavy hail': '⛈️', 'Clear sky': '☀️', 'Unknown conditions': '❓'
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await weatherAPI.getForecast();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>Weather & Forecasting</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Real-time localized agricultural weather data</div>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
          <div className="spin" style={{ width: '40px', height: '40px', borderWidth: '4px', borderTopColor: 'var(--g2)', borderColor: 'rgba(0,0,0,0.1)' }}></div>
          <div style={{ marginTop: '16px', fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Fetching Real-Time Forecast...</div>
        </div>
      ) : error ? (
        <div className="card" style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
          <div style={{ fontWeight: 800, fontSize: '14px' }}>{error}</div>
        </div>
      ) : weatherData && weatherData.forecast ? (
        <>
          {weatherData.advisories && weatherData.advisories.length > 0 && (
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {weatherData.advisories.map((advisory, idx) => (
                <div key={idx} style={{ padding: '12px 16px', background: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '4px', fontSize: '13px', fontWeight: 700, color: '#92400e' }}>
                  ⚠️ ADVISORY: {advisory}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-2" style={{ marginBottom: '24px' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, var(--g2), var(--g1))', color: '#fff', border: 'none', position: 'relative', overflow: 'hidden' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div>
                     <div style={{ fontSize: '10px', opacity: 0.8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{weatherData.location}</div>
                     <div style={{ fontSize: '48px', fontWeight: 800, margin: '8px 0', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>{weatherData.forecast.currentTempC}°C</div>
                     <div style={{ fontSize: '16px', fontWeight: 700 }}>{weatherData.forecast.currentCondition}</div>
                  </div>
                  <div style={{ fontSize: '72px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
                    {WEATHER_ICONS[weatherData.forecast.currentCondition] || '☀️'}
                  </div>
               </div>
            </div>

            <div className="card">
               <div className="card-title">7-Day Forecast</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '180px' }}>
                 {weatherData.forecast.days.map((f, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--g5)', borderRadius: '8px' }}>
                      <div style={{ width: '80px', fontWeight: 800, fontSize: '11px', color: 'var(--text)' }}>
                         {new Date(f.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
                      </div>
                      <div style={{ fontSize: '16px' }}>{WEATHER_ICONS[f.condition] || '☁️'}</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textAlign: 'right', width: '90px' }}>
                        <span style={{ color: 'var(--muted)' }}>{f.tempMin}°</span> / {f.tempMax}°
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6', width: '50px', textAlign: 'right' }}>
                        {f.rainProbabilityPct}% 💧
                      </div>
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
