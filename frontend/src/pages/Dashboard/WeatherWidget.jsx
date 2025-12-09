import React from 'react';

const WeatherWidget = ({ weatherData }) => {
  const data = weatherData || {
    location: "Kochi",
    temperature: "30°C",
    condition: "light rain",
    wind: "11 km/h",
    humidity: "85%",
    forecast: [
      { day: "Mon", temp: "30°C" },
      { day: "Tue", temp: "31°C" },
      { day: "Wed", temp: "30°C" },
      { day: "Thu", temp: "31°C" },
      { day: "Fri", temp: "31°C" }
    ]
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Current Weather</h3>
      </div>
      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-location">{data.location}</div>
          <div className="weather-details">
            <div className="weather-temp">{data.temperature}</div>
            <div className="weather-condition">{data.condition}</div>
          </div>
        </div>
        <div className="weather-stats">
          <div className="weather-stat">
            <span className="stat-label">Wind</span>
            <span className="stat-value">{data.wind}</span>
          </div>
          <div className="weather-stat">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{data.humidity}</span>
          </div>
        </div>
        <div className="weather-forecast">
          {data.forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <span className="forecast-day-name">{day.day}</span>
              <span className="forecast-day-temp">{day.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;