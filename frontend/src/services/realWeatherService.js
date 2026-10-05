// Real-Time Open-Meteo Weather Service with Caching and Localized Descriptions
// Supports exact Village / Sub-district / District / GPS coordinates across all Indian States

import { getCoordinatesForLocation } from "../data/indiaAdminData";

export const WMO_CODE_MAP = {
  0: { icon: "☀️", en: "Clear Sky", pa: "ਸਾਫ਼ ਆਕਾਸ਼ (ਧੁੱਪ)", hi: "साफ आसमान (धूप)" },
  1: { icon: "🌤️", en: "Mainly Clear", pa: "ਜ਼ਿਆਦਾਤਰ ਸਾਫ਼", hi: "मुख्यतः साफ" },
  2: { icon: "⛅", en: "Partly Cloudy", pa: "ਹਲਕੇ ਬੱਦਲ", hi: "हल्के बादल" },
  3: { icon: "☁️", en: "Overcast", pa: "ਬੱਦਲਵਾਈ", hi: "घने बादल" },
  45: { icon: "🌫️", en: "Morning Fog", pa: "ਸਵੇਰ ਦੀ ਧੁੰਦ", hi: "सुबह का कोहरा" },
  48: { icon: "🌫️", en: "Rime Fog", pa: "ਧੁੰਦ", hi: "घना कोहरा" },
  51: { icon: "🌦️", en: "Light Drizzle", pa: "ਹਲਕੀ ਬੂੰਦਾ-ਬਾਂਦੀ", hi: "हल्की बूंदाबांदी" },
  53: { icon: "🌦️", en: "Moderate Drizzle", pa: "ਬੂੰਦਾ-ਬਾਂਦੀ", hi: "बूंदाबांदी" },
  55: { icon: "🌧️", en: "Dense Drizzle", pa: "ਤੇਜ਼ ਬੂੰਦਾ-ਬਾਂਦੀ", hi: "घनी बूंदाबांदी" },
  61: { icon: "🌧️", en: "Slight Rain", pa: "ਹਲਕਾ ਮੀਂਹ", hi: "हल्की बारिश" },
  63: { icon: "🌧️", en: "Moderate Rain", pa: "ਦਰਮਿਆਨਾ ਮੀਂਹ", hi: "मध्यम बारिश" },
  65: { icon: "🌧️", en: "Heavy Rain", pa: "ਭਾਰੀ ਮੀਂਹ", hi: "भारी बारिश" },
  80: { icon: "🌦️", en: "Rain Showers", pa: "ਮੀਂਹ ਦੀਆਂ ਫੁਹਾਰਾਂ", hi: "बारिश की बौछारें" },
  95: { icon: "⛈️", en: "Thunderstorm", pa: "ਗਰਜ ਚਮਕ ਨਾਲ ਮੀਂਹ", hi: "गरज के साथ बौछार" }
};

export function getWeatherCondition(code) {
  return WMO_CODE_MAP[code] || { icon: "☀️", en: "Clear Weather", pa: "ਸਾਫ਼ ਮੌਸਮ", hi: "साफ मौसम" };
}

export async function fetchLiveWeatherData(stateName = "Punjab", districtName = null, customCoords = null) {
  let coords;
  let cacheKey;

  if (customCoords && customCoords.lat && customCoords.lon) {
    coords = {
      lat: customCoords.lat,
      lon: customCoords.lon,
      label: customCoords.label || "GPS Farm Location"
    };
    cacheKey = `weather_cache_gps_${customCoords.lat.toFixed(2)}_${customCoords.lon.toFixed(2)}`;
  } else {
    coords = getCoordinatesForLocation(stateName, districtName);
    cacheKey = `weather_cache_${stateName}_${districtName || 'default'}`;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather HTTP error: ${res.status}`);
    const data = await res.json();

    const currentWeather = getWeatherCondition(data.current.weather_code);

    const parsed = {
      isLive: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      station: coords.label || `${districtName || stateName} Agromet Station`,
      lat: coords.lat,
      lon: coords.lon,
      temp: `${Math.round(data.current.temperature_2m)}°C`,
      tempNum: Math.round(data.current.temperature_2m),
      humidity: `${Math.round(data.current.relative_humidity_2m)}%`,
      wind: `${Math.round(data.current.wind_speed_10m)} km/h`,
      code: data.current.weather_code,
      icon: currentWeather.icon,
      condition: currentWeather,
      daily: data.daily.time.map((timeStr, idx) => {
        const d = new Date(timeStr);
        const dayNames = {
          en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          pa: ["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨੀ"],
          hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
        };
        const dayIdx = d.getDay();
        const code = data.daily.weather_code[idx];
        const cond = getWeatherCondition(code);
        const rainProb = data.daily.precipitation_probability_max[idx] || 0;

        return {
          dateStr: `${d.getDate()} Oct`,
          day: {
            en: dayNames.en[dayIdx],
            pa: dayNames.pa[dayIdx],
            hi: dayNames.hi[dayIdx]
          },
          tempMax: `${Math.round(data.daily.temperature_2m_max[idx])}°C`,
          tempMin: `${Math.round(data.daily.temperature_2m_min[idx])}°C`,
          rainProb: `${rainProb}%`,
          icon: cond.icon,
          desc: cond,
          suitability: rainProb > 40
            ? { en: "Rain Risk: Halt Combining", pa: "ਮੀਂਹ ਦਾ ਖ਼ਤਰਾ: ਵਾਢੀ ਰੋਕੋ", hi: "बारिश जोखिम: कटाई रोकें" }
            : rainProb > 15
            ? { en: "Field Prep Possible", pa: "ਖੇਤ ਤਿਆਰੀ ਸੰਭਵ", hi: "खेत तैयारी संभव" }
            : { en: "Ideal for Harvest & Drying", pa: "ਵਾਢੀ ਤੇ ਸੁਕਾਉਣ ਲਈ ਸਹੀ", hi: "कटाई एवं सुखाने योग्य" }
        };
      })
    };

    localStorage.setItem(cacheKey, JSON.stringify(parsed));
    return parsed;
  } catch (err) {
    console.warn("Live weather fetch failed, attempting cache:", err);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        parsed.isLive = false;
        return parsed;
      } catch (e) {}
    }
    return null;
  }
}
