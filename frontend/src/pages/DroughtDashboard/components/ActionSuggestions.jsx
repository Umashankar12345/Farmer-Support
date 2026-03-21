// src/pages/DroughtDashboard/components/ActionSuggestions.jsx
import React from 'react';
import { Lightbulb, Droplets, Clock } from 'lucide-react';

const ActionSuggestions = ({ droughtData, filters, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const suggestions = [
    '🚰 Implement drip irrigation to conserve water',
    '🌾 Switch to drought-resistant crop varieties',
    '💧 Collect rainwater using farm ponds',
    '🌱 Use mulching to reduce soil moisture loss',
    '📅 Adjust planting schedule based on rainfall predictions'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> Suggested Actions
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-bold text-blue-800 mb-1 flex items-center gap-2 max-sm:text-sm">
            <Clock size={16} /> Immediate Actions
          </div>
          <div className="text-sm text-blue-700">Based on current {filters.location} conditions</div>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
              <span className="text-xl shrink-0">{index === 0 ? '🚰' : index === 1 ? '🌾' : index === 2 ? '💧' : index === 3 ? '🌱' : '📅'}</span>
              <span className="text-sm text-gray-700 font-medium pt-0.5">{suggestion}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="font-bold text-green-800 mb-2 flex items-center gap-2 max-sm:text-sm">
            <Droplets size={16} /> Water Saving Tips
          </div>
          <ul className="text-sm text-green-700 space-y-2">
            <li className="flex items-start gap-2 max-sm:text-xs">
              <span className="font-bold">•</span> Irrigate during early morning or evening
            </li>
            <li className="flex items-start gap-2 max-sm:text-xs">
              <span className="font-bold">•</span> Monitor soil moisture with simple tools
            </li>
            <li className="flex items-start gap-2 max-sm:text-xs">
              <span className="font-bold">•</span> Repair leaks in irrigation systems
            </li>
            <li className="flex items-start gap-2 max-sm:text-xs">
              <span className="font-bold">•</span> Use crop residue as mulch
            </li>
          </ul>
        </div>

        <button className="w-full mt-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium shadow-sm transition-all active:scale-95">
          Download Action Plan
        </button>
      </div>
    </div>
  );
};

export default ActionSuggestions;