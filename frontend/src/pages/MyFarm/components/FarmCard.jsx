import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, Ruler, Droplets, Mountain, MoreVertical, Eye, FlaskConical, BarChart3, Edit2, Trash2, Calendar } from 'lucide-react';
import GlassCard from '../../../components/UI/GlassCard';

const FarmCard = ({ farm, onView, onEdit, onDelete, onFertilizer, onAnalysis }) => {
  // Generate a simulated growth percentage based on planting date
  const calculateGrowth = (plantingDate) => {
    const start = new Date(plantingDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(Math.floor((diffDays / 120) * 100), 10), 95); // Assuming 120 days crop cycle
  };

  const growth = calculateGrowth(farm.plantingDate);

  return (
    <GlassCard className="group relative overflow-hidden flex flex-col h-full border-none shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Background Accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 rounded-full -mr-16 -mt-16 transition-colors duration-500 ${farm.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
        }`} />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className={`p-3 rounded-2xl shadow-inner ${farm.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
            }`}>
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight group-hover:text-emerald-600 transition-colors">
              {farm.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              {farm.location}
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${farm.status === 'Active'
            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
            : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
          }`}>
          {farm.status}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Ruler className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Area</span>
          </div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{farm.area}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Irrigation</span>
          </div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{farm.irrigation}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Soil</span>
          </div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{farm.soilType}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Crop</span>
          </div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{farm.crop}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Season Progress</span>
          <span className="text-[10px] font-bold text-emerald-600">{growth}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${growth}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
          />
        </div>
      </div>

      {/* Action Group */}
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
        <div className="grid grid-cols-3 gap-2 flex-1">
          <button
            onClick={onView}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-600 hover:text-white transition-all group/btn"
          >
            <Eye className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold">Details</span>
          </button>
          <button
            onClick={onFertilizer}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
          >
            <FlaskConical className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold">Nutrients</span>
          </button>
          <button
            onClick={onAnalysis}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <BarChart3 className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold">Insights</span>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default FarmCard;