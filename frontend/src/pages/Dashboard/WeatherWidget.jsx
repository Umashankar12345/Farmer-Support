import { useState, useEffect } from 'react'
import Card from '../../components/Layout/Card'
import { weatherAPI } from '../../services/api'

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('Delhi')
  const [error, setError] = useState(null)

  const indianCities = [
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'Chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'Kolkata', label: 'Kolkata, West Bengal' },
    { value: 'Bangalore', label: 'Bangalore, Karnataka' },
    { value: 'Hyderabad', label: 'Hyderabad, Telangana' },
  ]

  useEffect(() => {
    fetchWeatherData()
  }, [selectedCity])

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get current weather
      const current = await weatherAPI.getCurrentWeather(selectedCity)
      setWeather(current)
      
      // Get 5-day forecast
      const forecastData = await weatherAPI.getForecast(selectedCity, 5)
      setForecast(forecastData)
    } catch (error) {
      console.error('Failed to fetch weather:', error)
      setError(error.message)
      
      // Set fallback data
      setWeather({
        location: selectedCity,
        temperature: 28,
        conditions: 'Sunny',
        humidity: 65,
        wind_speed: 12,
        farming_advice: ['Good day for farming activities']
      })
      
      setForecast({
        city: selectedCity,
        forecasts: Array.from({ length: 5 }, (_, i) => ({
          date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }),
          temp: 28 + i,
          min_temp: 20 + i,
          max_temp: 32 + i,
          conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'][i],
          farming_alert: 'Normal conditions'
        }))
      })
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (iconCode) => {
    const icons = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return icons[iconCode] || '🌤️'
  }

  if (loading) {
    return (
      <Card title="Weather">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card 
      title="🌤️ Weather Forecast" 
      subtitle={weather?.location || 'Loading...'}
      action={
        <select 
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="text-sm border rounded-lg px-3 py-2 bg-white"
        >
          {indianCities.map(city => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
        </select>
      }
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">⚠️ {error}</p>
        </div>
      )}
      
      {weather && (
        <>
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">
              {weather.icon ? getWeatherIcon(weather.icon) : '🌤️'}
            </div>
            <div className="text-4xl font-bold mb-1">{weather.temperature}°C</div>
            <p className="text-gray-600 capitalize text-lg">{weather.conditions}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Humidity</p>
              <p className="font-semibold text-lg">{weather.humidity}%</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600">Wind</p>
              <p className="font-semibold text-lg">{weather.wind_speed || 12} km/h</p>
            </div>
          </div>

          {/* Farming Advice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">🌾 Farming Advice</h4>
            <ul className="space-y-2">
              {weather.farming_advice && weather.farming_advice.map((advice, index) => (
                <li key={index} className="text-sm text-yellow-700">• {advice}</li>
              ))}
            </ul>
          </div>

          {/* 5-Day Forecast */}
          {forecast && forecast.forecasts && (
            <div>
              <h4 className="font-medium mb-3">5-Day Forecast</h4>
              <div className="grid grid-cols-5 gap-2">
                {forecast.forecasts.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium">{day.date}</p>
                    <p className="text-xl mb-1">{getWeatherIcon(day.icon)}</p>
                    <p className="text-sm font-semibold">{day.max_temp || day.temp}°</p>
                    <p className="text-xs text-gray-500">{day.min_temp || (day.temp - 5)}°</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}

// ✅ ADD THIS LINE - MOST IMPORTANT!
export default WeatherWidget