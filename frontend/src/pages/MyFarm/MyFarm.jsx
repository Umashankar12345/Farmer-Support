import { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import StatCard from '../Dashboard/components/StatCard';
import SoilAnalysis from './components/SoilAnalysis';
import PerformanceTicker from '../Dashboard/components/PerformanceTicker';

export default function MyFarm() {
  const [farms, setFarms] = useState([
    { id: 1, name: 'North Field (Wheat)', size: '2.4 Ha', health: 88, status: 'Healthy', location: 'Jaipur N' },
    { id: 2, name: 'South Orchard (Mustard)', size: '1.2 Ha', health: 72, status: 'Review Needed', location: 'Jaipur S' },
    { id: 3, name: 'Canal Side (Millet)', size: '1.6 Ha', health: 91, status: 'Optimal', location: 'Amber' }
  ]);
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState('cards');

  const getColor = s => s >= 80 ? 'text-green-500' : s >= 65 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 p-8 flex flex-col">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Farms</h1>
              <p className="text-gray-500 font-medium">Detailed sensor & soil health metrics</p>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button 
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'cards' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >🃏 Card View</button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >🗺 Map View</button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {farms.map(farm => (
                    <div 
                      key={farm.id} 
                      onClick={() => setSelected(farm)}
                      className={`bg-white p-6 rounded-3xl border shadow-sm cursor-pointer transition-all hover:shadow-xl group relative overflow-hidden ${selected?.id === farm.id ? 'border-green-500 ring-1 ring-green-100' : 'border-gray-100'}`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🏡</div>
                        <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${
                          farm.health >= 80 ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                        }`}>{farm.status}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{farm.name}</h3>
                      <p className="text-sm text-gray-400 font-medium mt-1">{farm.location} • {farm.size}</p>
                      
                      <div className="mt-6 flex items-center justify-between border-t pt-4 border-gray-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Health Index</span>
                          <span className={`text-lg font-black ${getColor(farm.health)}`}>{farm.health}%</span>
                        </div>
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border-2 border-white text-xs">💧</div>
                           <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center border-2 border-white text-xs">🌱</div>
                           <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border-2 border-white text-xs">🦠</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-gray-100 transition-all">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl group-hover:rotate-90 transition-transform mb-2">➕</div>
                      <p className="text-sm font-bold text-gray-500">Add New Farm</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] border border-gray-100 relative group">
                   <div className="absolute inset-0 bg-green-50 flex items-center justify-center overflow-hidden">
                      {/* Simulated Map SVG */}
                      <svg width="100%" height="100%" viewBox="0 0 800 500" className="opacity-40">
                         <rect x="100" y="100" width="300" height="200" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
                         <rect x="450" y="50" width="200" height="150" fill="#eab308" fillOpacity="0.2" stroke="#eab308" strokeWidth="2" />
                         <rect x="400" y="250" width="250" height="200" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
                         <circle cx="250" cy="200" r="8" fill="#16a34a" />
                         <circle cx="550" cy="125" r="8" fill="#ca8a04" />
                         <circle cx="525" cy="350" r="8" fill="#16a34a" />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                         <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-2xl border border-white text-[10px] font-bold text-green-700 uppercase tracking-widest whitespace-nowrap">Interactive Map Interface Active</div>
                      </div>
                   </div>
                   <div className="absolute bottom-6 left-6 flex gap-2">
                       <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-white flex gap-2 items-center text-xs font-bold">
                          <span className="w-3 h-3 rounded bg-green-500"></span> Optimal
                       </div>
                       <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-white flex gap-2 items-center text-xs font-bold">
                          <span className="w-3 h-3 rounded bg-yellow-500"></span> Monitor
                       </div>
                   </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              {selected ? (
                <div className="sticky top-24">
                  <SoilAnalysis farmId={selected.id} farmName={selected.name} onClose={() => setSelected(null)} />
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                   <span className="text-5xl mb-6">🔍</span>
                   <h4 className="text-lg font-bold text-gray-900">Select a Farm</h4>
                   <p className="text-sm text-gray-400 mt-2 px-6">Click on a farm card to view detailed soil health and sensor insights.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <PerformanceTicker />
    </div>
  );
}
