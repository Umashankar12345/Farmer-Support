const axios = require("axios");

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const WEATHER_CODE_MAP = {
  0: "Clear sky",
  1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog",
  51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
  61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
  80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
  95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail",
};

function describeWeatherCode(code) {
  return WEATHER_CODE_MAP[code] || "Unknown conditions";
}

async function fetchForecast(lat, lon) {
  const response = await axios.get(FORECAST_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_probability_max",
        "weathercode",
      ].join(","),
      current_weather: true,
      timezone: "Asia/Kolkata",
      forecast_days: 7,
    },
    timeout: 8000,
  });

  const daily = response.data.daily;
  const current = response.data.current_weather;

  const days = daily.time.map((date, i) => ({
    date,
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
    rainfallMm: daily.precipitation_sum[i],
    rainProbabilityPct: daily.precipitation_probability_max[i],
    condition: describeWeatherCode(daily.weathercode[i]),
  }));

  return {
    currentTempC: current?.temperature,
    currentCondition: describeWeatherCode(current?.weathercode),
    days,
  };
}

function generateCropTimingAdvisory(forecast, cropStage) {
  const advisories = [];

  const rainDayIndex = forecast.days
    .slice(0, 3)
    .findIndex((d) => d.rainProbabilityPct >= 60);

  if (rainDayIndex !== -1) {
    const rainDay = forecast.days[rainDayIndex];
    const dayLabel = new Date(rainDay.date).toLocaleDateString("en-US", { weekday: "long" });

    if (cropStage === "ready_to_harvest") {
      const dryDayBefore = forecast.days[Math.max(0, rainDayIndex - 1)];
      const dryDayLabel = new Date(dryDayBefore.date).toLocaleDateString("en-US", { weekday: "long" });
      advisories.push(
        `Heavy rain expected ${dayLabel} (${rainDay.rainProbabilityPct}% chance, ${rainDay.rainfallMm}mm) - harvest by ${dryDayLabel} if possible.`
      );
    } else if (cropStage === "needs_spraying") {
      advisories.push(
        `Rain expected ${dayLabel} - hold off on spraying, it will wash off before absorbing.`
      );
    } else {
      advisories.push(
        `Rain expected ${dayLabel} (${rainDay.rainProbabilityPct}% chance) - plan field work around it.`
      );
    }
  }

  const hotDay = forecast.days.find((d) => d.tempMax >= 40);
  if (hotDay) {
    const dayLabel = new Date(hotDay.date).toLocaleDateString("en-US", { weekday: "long" });
    advisories.push(`High temperature expected ${dayLabel} (${hotDay.tempMax}°C) - consider early morning irrigation.`);
  }

  return advisories;
}

module.exports = {
  fetchForecast,
  generateCropTimingAdvisory,
};
