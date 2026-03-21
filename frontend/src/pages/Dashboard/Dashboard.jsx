// Dashboard.jsx - Premium Command Center
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import useFarmStore from '../../store/farmStore';
import {
    FaLeaf, FaWater, FaChartLine, FaExclamationTriangle,
    FaCloudRain, FaMoneyBillWave, FaPlus, FaFileAlt,
    FaSearch, FaCloudSun, FaTint, FaFlask, FaBoxes,
    FaMicrophone, FaUser, FaCamera, FaArrowUp, FaArrowDown, FaGlobe, FaSearchLocation
} from 'react-icons/fa';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import GlassCard from '../../components/UI/GlassCard';
import GradientButton from '../../components/UI/GradientButton';
import AnimatedCounter from '../../components/UI/AnimatedCounter';
import CommandPalette from '../../components/UI/CommandPalette';
import AIInsightCard from './AIInsightCard';
import { weatherAPI } from '../../services/api';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Lazy load FarmMap for performance
const FarmMap = lazy(() => import('./FarmMap'));

// Custom Tooltip for charts
const CustomChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const current = payload[0]?.value;
    const lastYear = payload[0]?.payload?.lastYear;
    const diff = lastYear ? (((current - lastYear) / lastYear) * 100).toFixed(1) : null;

    return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/20 dark:border-slate-700/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">
                {typeof current === 'number' ? current.toLocaleString() : current}
                <span className="text-sm font-medium ml-1.5 opacity-60">Value</span>
            </p>
            {diff !== null && (
                <div className={`text-xs font-bold mt-2 flex items-center gap-1.5 ${parseFloat(diff) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {parseFloat(diff) >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                    {Math.abs(diff)}% <span className="opacity-60 text-[10px] uppercase">vs last year</span>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cmdkOpen, setCmdkOpen] = useState(false);
    const [localWeather, setLocalWeather] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);

    // Zustand store
    const activeMetric = useFarmStore((s) => s.activeMetric);
    const setActiveMetric = useFarmStore((s) => s.setActiveMetric);
    const chartTimeRange = useFarmStore((s) => s.chartTimeRange);
    const setChartTimeRange = useFarmStore((s) => s.setChartTimeRange);
    const metricData = useFarmStore((s) => s.metricData);

    const userName = user?.name || localStorage.getItem('userName') || 'Farmer';

    useEffect(() => {
        // Main loading
        setTimeout(() => setLoading(false), 800);

        // Fetch real weather for Dashboard
        const fetchHomeWeather = async () => {
            try {
                const data = await weatherAPI.getCurrentWeather('Ludhiana');
                setLocalWeather(data);
            } catch (err) {
                console.error('Weather fetch error on Dashboard:', err);
                setLocalWeather({ temperature: 32, condition: 'Clear', icon: '☀️' });
            } finally {
                setWeatherLoading(false);
            }
        };
        fetchHomeWeather();
    }, []);

    // Yield data for the main area chart - Refined colors
    const yieldData = [
        { name: '2020', yield: 10, lastYear: 9 },
        { name: '2021', yield: 12, lastYear: 10 },
        { name: '2022', yield: 11, lastYear: 12 },
        { name: '2023', yield: 14, lastYear: 11 },
        { name: '2024', yield: 13, lastYear: 14 },
        { name: '2025', yield: 15, lastYear: 13 },
    ];

    const profitData = [
        { name: 'Rice', profit: 4200, lastYear: 3600 },
        { name: 'Wheat', profit: 3400, lastYear: 2800 },
        { name: 'Corn', profit: 2100, lastYear: 2200 },
        { name: 'Millet', profit: 1800, lastYear: 1500 },
    ];

    // Smart Analytics mini-cards config
    const miniCards = [
        {
            key: 'weather',
            label: 'Weather',
            icon: FaCloudSun,
            value: weatherLoading ? '--' : `${localWeather?.temperature}°C`,
            color: 'from-amber-400 to-orange-500',
            trend: localWeather?.condition || 'Analyzing...'
        },
        {
            key: 'irrigation',
            label: 'Soil Water',
            icon: FaWater,
            value: '22%',
            color: 'from-blue-400 to-indigo-500',
            trend: 'Satisfactory'
        },
        {
            key: 'soil',
            label: 'pH Index',
            icon: FaFlask,
            value: '6.4',
            color: 'from-emerald-400 to-teal-500',
            trend: 'Neutral High'
        },
        {
            key: 'inventory',
            label: 'Seed Stock',
            icon: FaBoxes,
            value: '4.2 T',
            color: 'from-rose-400 to-pink-500',
            trend: 'Low Refill'
        },
    ];

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
            {/* Command Palette */}
            <CommandPalette isOpen={cmdkOpen} onClose={() => setCmdkOpen(false)} />

            {/* Main Content */}
            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

                {/* AI Insight Card */}
                <AIInsightCard />

                {/* Custom Header with Profile Mini */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-2"
                        >
                            <span className="w-8 h-[2px] bg-emerald-600" /> Executive Dashboard
                        </motion.div>
                        <h1 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">
                            Hey, {userName} <span className="wave-emoji">👋</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pr-6 rounded-full shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            {userName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{userName}</span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Certified Partner
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sticky Sub-header */}
                <div className="sticky top-6 z-40">
                    <GlassCard className="!p-3 flex items-center justify-between gap-4 border-white/40 shadow-2xl shadow-emerald-500/10">
                        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
                            <GradientButton onClick={() => navigate('/my-farm')} className="!py-2.5 !px-5 !text-xs !rounded-2xl" icon={FaPlus}>
                                Add Field
                            </GradientButton>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/pest-disease')}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 transition-all whitespace-nowrap"
                            >
                                <FaCamera size={14} /> AI Scan
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.dispatchEvent(new CustomEvent('open-agrivoicechat'))}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-wider shadow-xl transition-all whitespace-nowrap"
                            >
                                <FaMicrophone size={14} /> AgriVoice
                            </motion.button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setCmdkOpen(true)}
                            className="hidden md:flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-400 text-xs hover:bg-white dark:hover:bg-slate-800 transition-all min-w-[280px] shadow-inner"
                        >
                            <FaSearch className="text-emerald-500" />
                            <span className="font-bold uppercase tracking-widest opacity-60">Global Search...</span>
                            <kbd className="ml-auto px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-[9px] font-black text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                Ctrl+K
                            </kbd>
                        </motion.button>
                    </GlassCard>
                </div>

                {/* Stats Grid - Sparkline Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Projected Yield', value: '14.2 T', trend: '+8.4%', icon: FaLeaf, color: 'text-emerald-500', bg: 'bg-emerald-500' },
                        { label: 'Soil Humidity', value: '62%', trend: 'Optimal', icon: FaWater, color: 'text-blue-500', bg: 'bg-blue-500' },
                        { label: 'Est. Revenue', value: '₹12.5L', trend: '+14.2%', icon: FaMoneyBillWave, color: 'text-amber-500', bg: 'bg-amber-500' },
                        { label: 'Active Alerts', value: '03', trend: 'Priority', icon: FaExclamationTriangle, color: 'text-rose-500', bg: 'bg-rose-500' },
                    ].map((stat, i) => (
                        <GlassCard key={i} className="group hover:-translate-y-2 transition-all duration-300 border-none shadow-xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-4 rounded-3xl ${stat.bg} bg-opacity-10 text-white group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`${stat.color} text-xl`} />
                                </div>
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${stat.trend.includes('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                    }`}>{stat.trend}</span>
                            </div>
                            <h3 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white">{stat.value}</h2>
                        </GlassCard>
                    ))}
                </div>

                {/* Metrics Selector Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {miniCards.map((card) => {
                        const Icon = card.icon;
                        const isActive = activeMetric === card.key;
                        return (
                            <motion.button
                                key={card.key}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveMetric(card.key)}
                                className={`relative overflow-hidden p-5 rounded-[40px] border-2 transition-all duration-500 text-left ${isActive
                                    ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/20 z-10'
                                    : 'bg-white/40 dark:bg-slate-900/40 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-xl mb-4 group-hover:rotate-6 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-black text-slate-800 dark:text-white">{card.value}</p>
                                    <span className="text-[10px] font-bold text-emerald-500 opacity-80">{card.trend}</span>
                                </div>
                                {isActive && (
                                    <motion.div layoutId="activeDot" className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Main Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <GlassCard className="h-[450px] !p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Analytical Preview</h3>
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{activeMetric} performance matrix</p>
                            </div>
                            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-[20px] shadow-inner">
                                {['monthly', 'yearly'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setChartTimeRange(range)}
                                        className={`px-5 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${chartTimeRange === range
                                            ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-lg'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="70%">
                            <AreaChart data={metricData[activeMetric]?.[chartTimeRange] || []}>
                                <defs>
                                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="6 6" stroke="#cbd5e1" vertical={false} opacity={0.3} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4 4' }} />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorMetric)" strokeWidth={4} dot={{ fill: '#10b981', r: 5, strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4, shadow: '0 0 20px rgba(16, 185, 129, 0.5)' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </GlassCard>

                    <GlassCard className="h-[450px] !p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Yield Forecast</h3>
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">6-Season projection model</p>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="70%">
                            <AreaChart data={yieldData}>
                                <defs>
                                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="6 6" stroke="#cbd5e1" vertical={false} opacity={0.3} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip content={<CustomChartTooltip />} />
                                <Area type="monotone" dataKey="yield" stroke="#3b82f6" fillOpacity={1} fill="url(#colorYield)" strokeWidth={4} dot={{ fill: '#3b82f6', r: 5, strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </div>

                {/* Market Row + Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <GlassCard className="lg:col-span-2 !p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">💰 Market Index</h3>
                            <div className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest">
                                <FaGlobe /> Global Exchange Live
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={profitData}>
                                <defs>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} content={<CustomChartTooltip />} />
                                <Bar dataKey="profit" radius={[20, 20, 10, 10]} barSize={50}>
                                    {profitData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "url(#colorProfit)" : "#10b981"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>

                    <GlassCard className="!p-8 bg-slate-900 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-8 flex items-center justify-between">
                                🔔 Intelligence
                                <span className="text-[10px] bg-red-500 px-3 py-1 rounded-full animate-pulse tracking-widest uppercase">Live</span>
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { msg: 'Storm Surge Expected', type: 'warn', time: '12m ago', icon: FaCloudRain },
                                    { msg: 'Rice Disease Detected', type: 'crit', time: '1h ago', icon: FaExclamationTriangle },
                                    { msg: 'Inventory Low: Urea', type: 'info', time: '3h ago', icon: FaBoxes },
                                ].map((alert, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex items-start gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <div className={`p-3 rounded-2xl ${alert.type === 'crit' ? 'bg-rose-500' : alert.type === 'warn' ? 'bg-amber-500' : 'bg-blue-500'
                                            } text-white shadow-lg`}>
                                            <alert.icon size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black leading-tight mb-1">{alert.msg}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alert.time}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
                        <div className="absolute -left-10 top-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px]" />
                    </GlassCard>
                </div>

                {/* Regional Activity Mini-Map */}
                <GlassCard className="!p-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Geospatial Intelligence</h3>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Satellite field telemetry — Active Fields</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                                <FaSearchLocation /> Locate Fields
                            </button>
                        </div>
                    </div>
                    <Suspense fallback={<div className="h-[450px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[40px]" />}>
                        <FarmMap />
                    </Suspense>
                </GlassCard>
            </div>
        </div>
    );
};

export default Dashboard;