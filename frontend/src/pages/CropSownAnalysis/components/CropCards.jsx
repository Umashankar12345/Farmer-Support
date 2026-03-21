// src/pages/CropSownAnalysis/components/CropCards.jsx
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Sprout } from 'lucide-react';

const CropCards = ({ filters }) => {
  const crops = [
    {
      name: 'Paddy',
      area: '1,200 acres',
      change: '+8%',
      trend: 'up',
      yield: 'High',
      risk: 'Medium',
      waterDemand: 'High',
      profitMargin: 'Good'
    },
    {
      name: 'Wheat',
      area: '850 acres',
      change: '+5%',
      trend: 'up',
      yield: 'Medium',
      risk: 'Low',
      waterDemand: 'Medium',
      profitMargin: 'Average'
    },
    {
      name: 'Maize',
      area: '650 acres',
      change: '-3%',
      trend: 'down',
      yield: 'High',
      risk: 'Low',
      waterDemand: 'Low',
      profitMargin: 'Good'
    },
    {
      name: 'Soybean',
      area: '450 acres',
      change: '+12%',
      trend: 'up',
      yield: 'Medium',
      risk: 'Medium',
      waterDemand: 'Medium',
      profitMargin: 'Excellent'
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-500 font-bold';
      case 'medium': return 'text-orange-500 font-medium';
      case 'low': return 'text-green-600 font-medium';
      default: return 'text-gray-600';
    }
  };

  const getYieldColor = (yieldLevel) => {
    switch (yieldLevel.toLowerCase()) {
      case 'high': return 'text-green-600 font-bold';
      case 'medium': return 'text-yellow-600 font-medium';
      case 'low': return 'text-red-600 font-bold';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Sprout className="text-green-600" /> Crop-wise Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {crops.map((crop, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h4 className="text-lg font-bold text-gray-800">{crop.name}</h4>
              <div className="flex items-center gap-1.5">
                {crop.trend === 'up'
                  ? <TrendingUp size={16} className="text-green-600" />
                  : <TrendingDown size={16} className="text-red-600" />
                }
                <span className={`text-sm font-semibold ${crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {crop.change}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 mb-5">
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-500">Area:</span>
                <span className="text-sm font-semibold text-gray-700">{crop.area}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-500">Yield:</span>
                <span className={`text-sm ${getYieldColor(crop.yield)}`}>
                  {crop.yield}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-500">Risk:</span>
                <span className={`text-sm flex items-center gap-1 ${getRiskColor(crop.risk)}`}>
                  {crop.risk === 'High' && <AlertTriangle size={12} />}
                  {crop.risk}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-500">Water:</span>
                <span className="text-sm font-medium text-gray-700">{crop.waterDemand}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-sm text-gray-500">Profit:</span>
                <span className="text-sm font-medium text-gray-700">{crop.profitMargin}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-200 transition-colors flex items-center justify-center gap-2">
                <BarChart3 size={14} />
                Details
              </button>
              <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors border border-green-600 flex items-center justify-center gap-2">
                🤖 Advisory
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropCards;