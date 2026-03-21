// src/pages/DroughtDashboard/components/DroughtMap.jsx
import React from 'react';
import { Map, AlertCircle } from 'lucide-react';

const DroughtMap = ({ data, filters, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 font-bold';
      case 'Medium': return 'text-orange-500 font-bold';
      case 'Low': return 'text-green-600 font-bold';
      default: return 'text-gray-600';
    }
  };

  const getRiskBg = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-50 border-red-200 text-red-800';
      case 'Medium': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'Low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Map className="text-blue-500" /> Drought Risk Map - {filters.location}
      </h3>

      <div className="flex-1 min-h-[300px] mb-6 relative rounded-xl overflow-hidden shadow-inner border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-orange-100 to-red-100 opacity-50"></div>

        {/* Mock Map Content */}
        <div className="absolute inset-0 p-6 flex items-center justify-center">
          <div className="text-center opacity-40 font-bold text-4xl text-gray-400 rotate-12 select-none">
            Interactive Map Area
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-100 max-w-[200px]">
          <div className="text-sm font-medium text-gray-600 mb-1">Risk Level</div>
          <div className={`text-xl ${getRiskColor(data.riskLevel)}`}>{data.riskLevel}</div>
          <div className="text-xs font-medium text-gray-500 mt-2">Rainfall Deficit</div>
          <div className="text-base font-bold text-red-600">{data.rainfallDeficit}</div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-gray-100 flex justify-between gap-2 overflow-x-auto text-xs font-medium">
          <div className="flex items-center gap-1.5 px-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Low Risk</div>
          <div className="flex items-center gap-1.5 px-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span> Moderate Risk</div>
          <div className="flex items-center gap-1.5 px-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High Risk</div>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <AlertCircle size={18} /> Affected Areas
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.affectedAreas.map((area, index) => (
            <div key={index} className={`p-3 rounded-lg border flex justify-between items-center transition-colors hover:shadow-sm cursor-default ${getRiskBg(area.risk)}`}>
              <span className="font-semibold">{area.name}</span>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded text-inherit shadow-sm">
                {area.risk}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DroughtMap;