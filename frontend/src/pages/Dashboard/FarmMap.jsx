import React from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import useFarmStore from '../../store/farmStore';
import 'leaflet/dist/leaflet.css';

const getMoistureColor = (moisture, pestAlert) => {
    if (pestAlert) return '#ef4444'; // Red for pest alerts
    if (moisture >= 70) return '#22c55e'; // Green — healthy
    if (moisture >= 40) return '#eab308'; // Yellow — moderate
    return '#ef4444'; // Red — low
};

const FarmMap = () => {
    const farmFields = useFarmStore((s) => s.farmFields);

    // Center map on average of all field positions
    const center = [28.6160, 77.2120];

    return (
        <div className="relative rounded-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 shadow-lg">
            <MapContainer
                center={center}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: '400px', width: '100%' }}
                className="rounded-2xl"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {farmFields.map((field) => {
                    const color = getMoistureColor(field.moisture, field.pestAlert);
                    return (
                        <Polygon
                            key={field.id}
                            positions={field.positions}
                            pathOptions={{
                                color: color,
                                fillColor: color,
                                fillOpacity: 0.35,
                                weight: 2,
                            }}
                        >
                            <Tooltip sticky>
                                <div className="text-xs">
                                    <p className="font-bold text-sm">{field.name}</p>
                                    <p>Crop: {field.crop}</p>
                                    <p>Moisture: {field.moisture}%</p>
                                    {field.pestAlert && (
                                        <p className="text-red-600 font-semibold">⚠ Pest Alert!</p>
                                    )}
                                </div>
                            </Tooltip>
                        </Polygon>
                    );
                })}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl px-4 py-3 shadow-lg border border-gray-200/50 dark:border-slate-700/50">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Field Status</p>
                <div className="flex flex-col gap-1.5">
                    {[
                        { color: '#22c55e', label: 'Healthy (70%+)' },
                        { color: '#eab308', label: 'Moderate (40-69%)' },
                        { color: '#ef4444', label: 'Alert / Pest' },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[11px] text-gray-600 dark:text-gray-400">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FarmMap;
