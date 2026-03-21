// src/pages/CropSownAnalysis/components/AIInsights.jsx
import React, { useState } from 'react';
import { Brain, MessageCircle, CloudRain, Thermometer } from 'lucide-react';

const AIInsights = ({ filters }) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  const insights = [
    {
      icon: <CloudRain size={20} className="text-blue-500" />,
      title: 'Water Management',
      content: 'Paddy area increased by 12% in your district. Water demand may rise. Consider alternate crops like pulses.',
      priority: 'high'
    },
    {
      icon: <Thermometer size={20} className="text-orange-500" />,
      title: 'Weather Advisory',
      content: 'Upcoming heatwave may affect wheat crops. Consider early harvesting or protective irrigation.',
      priority: 'medium'
    },
    {
      icon: <span className="text-lg">🌾</span>,
      title: 'Crop Rotation',
      content: 'Continuous paddy cultivation may deplete soil nutrients. Suggest soybean or green manure rotation.',
      priority: 'medium'
    },
    {
      icon: <span className="text-lg">💰</span>,
      title: 'Market Trends',
      content: 'Soybean prices expected to rise 15% next season. Good opportunity for expansion.',
      priority: 'low'
    }
  ];

  const recommendations = [
    'Reduce paddy area by 20% in water-scarce regions',
    'Introduce drought-resistant wheat varieties',
    'Implement precision irrigation for water optimization',
    'Schedule soil testing before next sowing season'
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">🤖 AI Insights & Recommendations</h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          <MessageCircle size={18} />
          Talk to Krishi Officer
        </button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {insights.map((insight, index) => (
            <div key={index} className={`relative p-5 rounded-xl border flex gap-4 transition-all hover:shadow-md ${getPriorityColor(insight.priority)}`}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm opacity-90 leading-relaxed font-medium">{insight.content}</p>
              </div>
              <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white shadow-sm opacity-80`}>
                {insight.priority}
              </span>
            </div>
          ))}
        </div>

        {showFullAnalysis && (
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100 animate-fadeIn">
            <h4 className="font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">Detailed Analysis</h4>
            <div className="text-blue-800">
              <p className="mb-4 font-medium">
                Based on historical data and current sowing patterns, the AI predicts:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 bg-white/60 p-3 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Water demand will increase by 18% in the next season</li>
                <li className="flex items-center gap-2 bg-white/60 p-3 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Soil nutrient depletion risk: Medium-High</li>
                <li className="flex items-center gap-2 bg-white/60 p-3 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Expected yield reduction: 5-8% if current practices continue</li>
                <li className="flex items-center gap-2 bg-white/60 p-3 rounded-lg"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Market price stability: 85% confidence</li>
              </ul>
            </div>
          </div>
        )}

        <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-6">
          <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
            ✅ Recommended Actions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex gap-3 bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 font-medium pt-0.5">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95"
            onClick={() => setShowFullAnalysis(!showFullAnalysis)}
          >
            {showFullAnalysis ? 'Show Less' : 'Get Detailed Analysis'}
          </button>
          <button className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-medium transition-colors">
            Generate Custom Report
          </button>
          <button className="px-5 py-2.5 bg-white hover:bg-green-50 text-green-700 border border-green-200 rounded-xl font-medium transition-colors">
            Save Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;