import { useState, useEffect } from 'react';

export function useWeather(location = 'Rajasthan') {
  const [forecast, setForecast] = useState([
    { day: 'Mon', temp: '32°C', icon: '☀️' },
    { day: 'Tue', temp: '30°C', icon: '⛅' },
    { day: 'Wed', temp: '28°C', icon: '🌦️' },
    { day: 'Thu', temp: '31°C', icon: '☀️' },
    { day: 'Fri', temp: '33°C', icon: '☀️' },
    { day: 'Sat', temp: '34°C', icon: '☀️' },
    { day: 'Sun', temp: '32°C', icon: '⛅' }
  ]);

  useEffect(() => {
    // Attempt to fetch from backend, fallback to demo data
    fetch(`/api/weather/forecast?location=${location}`)
      .then(r => r.json())
      .then(data => {
        if (data.daily) setForecast(data.daily);
      })
      .catch(err => {
        console.log('Weather API not ready yet, using demo data');
      });
  }, [location]);

  return { forecast };
}
