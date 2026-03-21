// src/pages/CropProduction/components/ProductionCharts.jsx
import React from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

const ProductionCharts = ({ productionData, filters, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="text-blue-500" /> Production Data Visualization
      </h3>

      <div className="space-y-10">
        {/* BarChart - Production by Crop */}
        <div className="border-b border-gray-100 pb-8">
          <h4 className="font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <BarChart3 size={18} /> Production by Crop (tons)
          </h4>
          <div className="space-y-5">
            {productionData?.barChartData?.map((crop, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800 w-20">{crop.crop}</span>
                  <span className="font-bold text-gray-900">{crop.production.toLocaleString()} tons</span>
                </div>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer">
                  <div
                    className="h-full bg-blue-500 rounded-lg transition-all duration-1000 ease-out group-hover:bg-blue-600"
                    style={{ width: `${(crop.production / 5000) * 100}%` }}
                  ></div>
                  <div className="absolute top-0 right-2 h-full flex items-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    exp: {crop.expected}
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex justify-end gap-2">
                  <span className={crop.production >= crop.expected ? 'text-green-600' : 'text-red-600'}>
                    {crop.production >= crop.expected ? '+' : ''}{crop.production - crop.expected} vs expected
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart - Trend Over Years */}
        <div className="border-b border-gray-100 pb-8">
          <h4 className="font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <TrendingUp size={18} /> Production Trend Over Years
          </h4>
          <div className="h-56 flex items-end space-x-4 pl-4 border-l border-b border-gray-200 pb-2">
            {productionData?.trendData?.map((year, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer relative">
                <div className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {year.production.toLocaleString()} tons
                </div>
                <div
                  className="w-full bg-green-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all hover:bg-green-600"
                  style={{ height: `${(year.production / 15000) * 100}%` }}
                ></div>
                <div className="text-xs font-medium text-gray-600 mt-3">{year.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Chart */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <PieChart size={18} /> Expected vs Actual Yield (Monthly)
          </h4>
          <div className="space-y-4">
            {productionData?.comparisonData?.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-800">{month.month}</span>
                  <span className={`font-medium ${month.actual >= month.expected ? 'text-green-600' : 'text-red-600'}`}>
                    {month.actual >= month.expected ? 'On Track' : 'Below Target'} ({Math.round(month.actual / month.expected * 100)}%)
                  </span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden flex relative">
                  {/* Target Line marker */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10 dashed" style={{ left: '50%' }}></div>

                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${Math.min((month.actual / (month.expected * 1.5)) * 100, 100)}%` }}
                    title={`Actual: ${month.actual}`}
                  ></div>
                  <div
                    className="h-full bg-green-200/50 absolute top-0 left-0 bottom-0"
                    style={{ width: `${(month.expected / (month.expected * 1.5)) * 100}%` }}
                    title={`Target: ${month.expected}`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span>Actual: {month.actual}</span>
                  <span>Target: {month.expected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionCharts;