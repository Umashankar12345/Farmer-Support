import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Droplets, Clock, Info, ChevronRight, Search, Leaf, FlaskConical } from 'lucide-react';
import GlassCard from '../../components/UI/GlassCard';

const Fertilizer = () => {
  const [selectedCrop, setSelectedCrop] = useState('Paddy');
  const [searchTerm, setSearchTerm] = useState('');

  const crops = [
    { id: 'Paddy', name: 'Paddy', icon: '🌾' },
    { id: 'Wheat', name: 'Wheat', icon: '🌾' },
    { id: 'Cotton', name: 'Cotton', icon: '🧵' },
    { id: 'Sugarcane', name: 'Sugarcane', icon: '🎋' },
    { id: 'Maize', name: 'Maize', icon: '🌽' },
  ];

  const fertilizerData = [
    { id: 1, crop: "Paddy", fertilizer: "Urea", quantity: "100 kg/ha", time: "Before sowing", method: "Broadcast evenly", type: "Nitrogen", efficiency: 85 },
    { id: 2, crop: "Wheat", fertilizer: "DAP", quantity: "80 kg/ha", time: "During sowing", method: "Drill with seeds", type: "Phosphorus", efficiency: 90 },
    { id: 3, crop: "Cotton", fertilizer: "NPK", quantity: "120 kg/ha", time: "After 30 days", method: "Side dressing", type: "Balanced", efficiency: 75 },
    { id: 4, crop: "Sugarcane", fertilizer: "Urea + MOP", quantity: "150 kg/ha", time: "3 stages", method: "Band placement", type: "Mixed", efficiency: 80 },
    { id: 5, crop: "Maize", fertilizer: "Zinc Sulphate", quantity: "25 kg/ha", time: "Basal dose", method: "Soil application", type: "Micronutrient", efficiency: 95 },
  ];

  const filteredData = fertilizerData.filter(item =>
    item.crop === selectedCrop &&
    (item.fertilizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <div className="mb-8 p-8 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2 flex items-center gap-3"
          >
            <FlaskConical className="w-10 h-10" /> Fertilizer Optimizer
          </motion.h1>
          <p className="text-emerald-50 opacity-90 text-lg max-w-2xl">
            Get scientifically backed fertilizer recommendations tailored for your specific crops and soil conditions.
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Crop Selector */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" /> Select Crop
            </h3>
            <div className="space-y-2">
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedCrop === crop.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                      : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{crop.icon}</span>
                    <span className="font-medium">{crop.name}</span>
                  </span>
                  {selectedCrop === crop.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4 bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30">
            <div className="flex gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg h-fit">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm mb-1">Expert Tip</h4>
                <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed">
                  Avoid applying fertilizers during heavy rain or high winds to prevent runoff and nutrient loss.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Content - Recommendations */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-2">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Showing {filteredData.length} recommendations</span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full group overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                          {item.fertilizer}
                        </h3>
                        <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">
                          {item.type}
                        </span>
                      </div>
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-xl">
                        <Sprout className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl">
                          <Droplets className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Quantity</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl">
                          <Clock className="w-5 h-5 text-orange-500" />
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Timing</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.time}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Application Method</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.method}
                        </p>
                      </div>

                      {/* Efficiency Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500 font-bold uppercase">Absorption Efficiency</span>
                          <span className="text-emerald-600 font-bold">{item.efficiency}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.efficiency}%` }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                          />
                        </div>
                      </div>
                    </div>
                </motion.div>
                                </motion.div>
                            ))}
        </div>
      </AnimatePresence>

      {filteredData.length === 0 && (
        <div className="py-20 text-center">
          <div className="bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">No results found</h3>
          <p className="text-slate-500">Try adjusting your search or selecting a different crop.</p>
        </div>
      )}
    </div>
            </div >
        </div >
    );
};

export default Fertilizer;
