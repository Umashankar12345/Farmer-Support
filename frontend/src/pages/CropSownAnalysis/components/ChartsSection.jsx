// src/pages/CropSownAnalysis/components/ChartsSection.jsx
import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

const ChartsSection = ({ filters }) => {
  // Sample chart data
  const barChartData = [
    { crop: 'Paddy', area: 1200, color: '#38a169' },
    { crop: 'Wheat', area: 850, color: '#3182ce' },
    { crop: 'Maize', area: 650, color: '#dd6b20' },
    { crop: 'Soybean', area: 450, color: '#805ad5' },
    { crop: 'Cotton', area: 320, color: '#d53f8c' },
    { crop: 'Sugarcane', area: 280, color: '#ecc94b' }
  ];

  const pieChartData = [
    { crop: 'Paddy', percentage: 32, color: '#38a169' },
    { crop: 'Wheat', percentage: 22, color: '#3182ce' },
    { crop: 'Maize', percentage: 18, color: '#dd6b20' },
    { crop: 'Others', percentage: 28, color: '#a0aec0' }
  ];

  const lineChartData = [
    { year: '2020', paddy: 1000, wheat: 700, maize: 500 },
    { year: '2021', paddy: 1100, wheat: 750, maize: 550 },
    { year: '2022', paddy: 1150, wheat: 800, maize: 600 },
    { year: '2023', paddy: 1200, wheat: 850, maize: 650 }
  ];

  const maxArea = Math.max(...barChartData.map(d => d.area));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-800">📊 Crop Analysis Charts</h3>
        <div className="flex gap-4 text-xs font-medium text-gray-600">
          <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Paddy</span>
          <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Wheat</span>
          <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Maize</span>
          <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div> Others</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-base font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <BarChart3 size={18} /> Area Sown by Crop (acres)
          </h4>
          <div className="flex items-end justify-around h-[200px] px-4 pb-2">
            {barChartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-full">
                <div
                  className="w-8 sm:w-12 rounded-t-sm relative group transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${(item.area / maxArea) * 100}%`,
                    backgroundColor: item.color
                  }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.area}
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium rotate-0 sm:rotate-0 truncate w-full text-center">{item.crop}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-base font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <PieChart size={18} /> Crop Distribution (%)
          </h4>
          <div className="flex items-center justify-center gap-8 md:gap-12 h-[200px]">
            <div className="relative w-40 h-40 rounded-full shrink-0" style={{
              background: `conic-gradient(
                #38a169 0% 32%,
                #3182ce 32% 54%,
                #dd6b20 54% 72%,
                #a0aec0 72% 100%
              )`
            }}>
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            </div>

            <div className="flex flex-col gap-2">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                  <span>{item.crop}: <span className="font-semibold text-gray-800">{item.percentage}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-50 rounded-lg p-6 xl:col-span-2">
          <h4 className="text-base font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <TrendingUp size={18} /> Trend Over Years
          </h4>
          <div className="relative h-[250px] pt-4 pb-8 pl-4 pr-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex justify-between px-10 pointer-events-none">
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-px h-full bg-gray-200"></div>
            </div>

            {/* SVG Lines */}
            <svg className="w-full h-full absolute top-0 left-0 px-10 pointer-events-none" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#38a169"
                strokeWidth="2.5"
                points={lineChartData.map((d, i) =>
                  `${(i * 33.33)}%,${100 - (d.paddy / 1300 * 100)}%`
                ).join(' ')}
              />
              <polyline
                fill="none"
                stroke="#3182ce"
                strokeWidth="2.5"
                points={lineChartData.map((d, i) =>
                  `${(i * 33.33)}%,${100 - (d.wheat / 1300 * 100)}%`
                ).join(' ')}
              />
              <polyline
                fill="none"
                stroke="#dd6b20"
                strokeWidth="2.5"
                points={lineChartData.map((d, i) =>
                  `${(i * 33.33)}%,${100 - (d.maize / 1300 * 100)}%`
                ).join(' ')}
              />
            </svg>

            {/* Labels & Data Points */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
              {lineChartData.map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex flex-col gap-1 mb-2 items-center text-[10px] font-bold">
                    <span style={{ color: '#38a169' }}>{d.paddy}</span>
                    <span style={{ color: '#3182ce' }}>{d.wheat}</span>
                    <span style={{ color: '#dd6b20' }}>{d.maize}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 border-t border-gray-300 pt-1 px-2">{d.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;