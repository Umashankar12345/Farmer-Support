import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function FieldMap({ centerCoords = [26.9124, 75.7873], geoJsonData }) {
  useEffect(() => {
    // Initialize map instance
    const map = L.map("krishi-map").setView(centerCoords, 13);

    // Base Map Layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Open-Meteo Dynamic Rain Radar Layer Overlay
    L.tileLayer("https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHER_KEY", {
      opacity: 0.5
    }).addTo(map);

    // Render Dynamic GeoJSON Field Boundaries if present
    if (geoJsonData) {
      L.geoJSON(geoJsonData, {
        style: {
          color: "#10b981",
          weight: 3,
          fillColor: "#059669",
          fillOpacity: 0.35
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            layer.bindPopup(`
              <div style="font-family: sans-serif; font-size: 12px;">
                <strong>${feature.properties.fieldName || "Plot A"}</strong><br/>
                Soil: ${feature.properties.soilType || "Sandy Loam"}<br/>
                NDVI Index: <span style="color: green; font-weight: bold;">0.78</span>
              </div>
            `);
          }
        }
      }).addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [centerCoords, geoJsonData]);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2">
          🛰️ GeoJSON Sentinel-2 Field & Weather Layer
        </h4>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
          LIVE COORDS: {centerCoords[0]}, {centerCoords[1]}
        </span>
      </div>
      <div id="krishi-map" className="h-64 w-full rounded-xl border border-slate-100"></div>
    </div>
  );
}
