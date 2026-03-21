// src/pages/CropProduction/components/CropCards.jsx
import React from 'react';
import { Wheat, FileText, Sparkles, Sprout } from 'lucide-react';

const CropCards = ({ crops, onCropSelect, selectedCrop, loading }) => {
  const getStars = (grade) => {
    return '⭐'.repeat(grade) + '☆'.repeat(5 - grade);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Wheat className="text-yellow-600" /> Crop-wise Production
      </h3>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {crops?.map(crop => (
          <div
            key={crop.id}
            className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${selectedCrop?.id === crop.id
                ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/10'
                : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            onClick={() => onCropSelect(crop)}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Sprout size={18} className="text-green-600" /> {crop.name}
              </h4>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(crop.status)}`}>
                {crop.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Area</div>
                <div className="font-bold text-gray-800">{crop.area}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Production</div>
                <div className="font-bold text-gray-800">{crop.production}</div>
              </div>
            </div>

            <div className="mb-4 px-1">
              <div className="flex justify-between items-end mb-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Yield</div>
                <div className="font-bold text-gray-800">{crop.yield}</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(crop.yieldGrade / 5) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-yellow-400 text-sm tracking-widest">{getStars(crop.yieldGrade)}</div>
              <div className="flex gap-2">
                <button
                  className="text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // View details logic
                  }}
                >
                  <FileText size={12} /> Details
                </button>
                <button
                  className="text-xs font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // AI advice logic
                  }}
                >
                  <Sparkles size={12} /> AI Advice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropCards;