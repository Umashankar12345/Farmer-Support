// src/pages/CropProduction/components/AIPrediction.jsx
import React from 'react';
import { Bot, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AIPrediction = ({ prediction, selectedCrop, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[300px] flex flex-col justify-center items-center text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <Bot className="text-blue-500" /> AI Yield Prediction
        </h3>
        <div className="py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
            <Bot size={32} className="text-blue-500" />
          </div>
          <p className="text-gray-600 font-medium">Select a crop to see AI predictions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Bot className="text-blue-500" /> AI Yield Prediction - {selectedCrop}
      </h3>

      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Predicted Yield Increase</span>
          <span className="text-3xl font-bold text-green-600 drop-shadow-sm">{prediction.predictedYield}</span>
        </div>
        <div className="text-xs font-medium text-gray-500">
          Confidence: <span className="font-bold text-blue-700">{prediction.confidence}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <span className="bg-green-100 text-green-600 p-1 rounded-md"><CheckCircle2 size={14} /></span> Recommendations
          </h4>
          <ul className="space-y-2">
            {prediction.recommendations?.map((rec, index) => (
              <li key={index} className="text-sm text-gray-700 bg-green-50/50 border border-green-100 p-3 rounded-lg flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span> {rec}
              </li>
            ))}
          </ul>
        </div>

        {prediction.risks?.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <span className="bg-red-100 text-red-600 p-1 rounded-md"><AlertTriangle size={14} /></span> Potential Risks
            </h4>
            <ul className="space-y-2">
              {prediction.risks.map((risk, index) => (
                <li key={index} className="text-sm text-gray-700 bg-red-50/50 border border-red-100 p-3 rounded-lg flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span> {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-200 mt-2 flex items-center justify-center gap-2">
          <Bot size={18} /> Get Detailed AI Analysis
        </button>
      </div>
    </div>
  );
};

export default AIPrediction;