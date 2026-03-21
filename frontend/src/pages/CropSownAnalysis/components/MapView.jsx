// src/pages/CropSownAnalysis/components/MapView.jsx
import React from 'react';
import { MapPin } from 'lucide-react';

const MapView = ({ filters }) => {
  const districts = [
    { name: 'Nagpur', crop: 'Paddy', intensity: 'high', area: '450 acres', color: '#38a169' },
    { name: 'Amravati', crop: 'Wheat', intensity: 'medium', area: '320 acres', color: '#3182ce' },
    { name: 'Wardha', crop: 'Cotton', intensity: 'high', area: '280 acres', color: '#d53f8c' },
    { name: 'Akola', crop: 'Soybean', intensity: 'low', area: '180 acres', color: '#805ad5' },
    { name: 'Yavatmal', crop: 'Pulses', intensity: 'medium', area: '220 acres', color: '#dd6b20' }
  ];

  const intensityColors = {
    high: '#38a169',
    medium: '#ecc94b',
    low: '#fed7d7'
  };

  const getIntensityBadgeColor = (intensity) => {
    switch (intensity) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">🗺️ District-wise Crop Distribution</h3>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-sm text-gray-600"><div className="w-3 h-3 rounded-full bg-green-500"></div> High Density</span>
          <span className="flex items-center gap-2 text-sm text-gray-600"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Medium</span>
          <span className="flex items-center gap-2 text-sm text-gray-600"><div className="w-3 h-3 rounded-full bg-red-200"></div> Low</span>
        </div>
      </div>

      <div className="bg-blue-50/50 rounded-xl h-[400px] mb-8 relative overflow-hidden border border-blue-100">
        {/* Simplified Map Visualization */}
        <div className="relative w-full h-full">
          {districts.map((district, index) => (
            <div
              key={index}
              className="absolute w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center gap-2 transition-transform hover:scale-110 cursor-pointer shadow-sm group"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index % 3 * 20)}%`,
                backgroundColor: intensityColors[district.intensity],
                opacity: district.intensity === 'high' ? 0.8 : district.intensity === 'medium' ? 0.6 : 0.4
              }}
            >
              <MapPin size={20} className="text-gray-800 opacity-70 group-hover:opacity-100" />
              <span className="text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {district.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">District Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {districts.map((district, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-bold text-gray-800">{district.name}</h5>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getIntensityBadgeColor(district.intensity)}`}>
                  {district.intensity}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 flex justify-between"><strong>Major Crop:</strong> <span>{district.crop}</span></p>
                <p className="text-sm text-gray-600 flex justify-between"><strong>Area:</strong> <span>{district.area}</span></p>
                <p className="text-sm text-gray-600 flex justify-between"><strong>Farmers:</strong> <span>{Math.floor(Math.random() * 500) + 100}</span></p>
              </div>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;