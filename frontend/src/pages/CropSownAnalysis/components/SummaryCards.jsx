// src/pages/CropSownAnalysis/components/SummaryCards.jsx
import React from 'react';
import { Leaf, Map, TrendingUp, AlertTriangle } from 'lucide-react';

const SummaryCards = ({ filters }) => {
  const summaryData = {
    totalCrops: 12,
    totalArea: '2,450 acres',
    majorCrop: 'Paddy',
    change: '+8%',
    riskLevel: 'Medium',
    riskType: 'Drought'
  };

  const cards = [
    {
      title: 'Total Crops Sown',
      value: summaryData.totalCrops,
      icon: <Leaf size={24} className="text-green-600" />,
      color: 'border-l-green-500'
    },
    {
      title: 'Total Area',
      value: summaryData.totalArea,
      icon: <Map size={24} className="text-blue-600" />,
      color: 'border-l-blue-500'
    },
    {
      title: 'Major Crop',
      value: summaryData.majorCrop,
      icon: <span className="text-2xl">🌾</span>,
      color: 'border-l-yellow-500'
    },
    {
      title: 'Change vs Last Season',
      value: summaryData.change,
      icon: <TrendingUp size={24} className={summaryData.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} />,
      color: summaryData.change.startsWith('+') ? 'border-l-green-500' : 'border-l-red-500'
    },
    {
      title: 'Risk Alert',
      value: `${summaryData.riskLevel} Risk`,
      icon: <AlertTriangle size={24} className="text-red-600" />,
      color: 'border-l-red-500',
      subtitle: summaryData.riskType
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border-l-4 hover:shadow-md transition-shadow ${card.color}`}>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full">
            {card.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 m-0 leading-tight">{card.value}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-0">{card.title}</p>
            {card.subtitle && (
              <p className="text-xs text-red-500 font-medium mt-1 mb-0 flex items-center gap-1">
                ⚠️ {card.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;