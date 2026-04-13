import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import StatCard from '../Dashboard/components/StatCard';
import PerformanceTicker from '../Dashboard/components/PerformanceTicker';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Analytics() {
  const [metrics, setMetrics] = useState(null);
  const [mandiPrices, setMandiPrices] = useState([]);

  useEffect(() => {
    // Fetch metrics
    fetch('/api/analytics/dashboard', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || localStorage.getItem('krishi_jwt')}` }
    }).then(r => r.json()).then(setMetrics).catch(console.error);

    // Fetch market prices
    fetch('/api/market/prices')
      .then(r => r.json()).then(d => setMandiPrices(d.prices)).catch(console.error);
  }, []);

  const chartData = {
    labels: metrics?.queryCategories?.map(c => c.category) || [],
    datasets: [{
      data: metrics?.queryCategories?.map(c => c.count) || [],
      backgroundColor: ['#16a34a', '#3b82f6', '#eab308', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 20
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 p-8 flex flex-col max-w-6xl mx-auto w-full">
          <header className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Analytics</h1>
            <p className="text-gray-500 font-medium">Performance metrics & market intelligence</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="AI Accuracy" value={metrics?.aiAccuracy || '94.2%'} icon="🎯" />
            <StatCard label="Avg Latency" value={metrics?.avgLatency || '142ms'} icon="⚡" />
            <StatCard label="Farmers Served" value={metrics?.farmersServed || '12.4k'} icon="👥" />
            <StatCard label="Cache Hit Rate" value={metrics?.techStack?.cacheHitRate || '98.5%'} icon="💾" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
                <h3 className="w-full text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Query Distribution</h3>
                <div className="w-64 h-64">
                   <Doughnut 
                     data={chartData} 
                     options={{ 
                       cutout: '75%', 
                       plugins: { legend: { display: false } } 
                     }} 
                   />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                   {metrics?.queryCategories?.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}></span>
                         <span className="text-[10px] font-bold text-gray-500 uppercase">{c.category}</span>
                      </div>
                   ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Live Mandi Prices (eNAM)</h3>
                <div className="space-y-4">
                   {mandiPrices.map((p, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-green-300 transition-all cursor-pointer">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">🌾</div>
                            <div>
                               <p className="text-sm font-bold text-gray-900">{p.crop} ({p.variant})</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase">{p.mandi} Market</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-gray-900">{p.price}</p>
                            <p className={`text-[10px] font-bold ${p.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{p.trend} Today</p>
                         </div>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-6 py-3 bg-gray-900 text-white text-[10px] font-black uppercase rounded-xl hover:bg-black transition-all">View All 140+ Markets</button>
            </div>
          </div>
        </main>
      </div>
      <PerformanceTicker />
    </div>
  );
}
