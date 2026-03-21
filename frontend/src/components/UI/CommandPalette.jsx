import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaTachometerAlt, FaLeaf, FaFlask, FaCloudSun, FaBug, FaLandmark,
    FaCalendarAlt, FaChartLine, FaTractor, FaExclamationTriangle,
    FaRobot, FaComments, FaCog, FaSearch, FaTimes
} from 'react-icons/fa';

const pages = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard', keywords: 'home overview stats' },
    { path: '/my-farm', icon: FaLeaf, label: 'My Farm', keywords: 'crops fields land' },
    { path: '/fertilizer', icon: FaFlask, label: 'Fertilizer', keywords: 'nutrients npk soil' },
    { path: '/weather', icon: FaCloudSun, label: 'Weather Forecast', keywords: 'rain temperature climate' },
    { path: '/pest-disease', icon: FaBug, label: 'Pest & Disease', keywords: 'insects bugs treatment' },
    { path: '/government-schemes', icon: FaLandmark, label: 'Government Schemes', keywords: 'subsidy grants policy' },
    { path: '/crop-calendar', icon: FaCalendarAlt, label: 'Crop Calendar', keywords: 'schedule planting harvest' },
    { path: '/crop-sown-analysis', icon: FaChartLine, label: 'Crop Sown Analysis', keywords: 'area data analysis' },
    { path: '/crop-production', icon: FaChartLine, label: 'Crop Production', keywords: 'yield output tons' },
    { path: '/farm-mechanization', icon: FaTractor, label: 'Farm Mechanization', keywords: 'equipment tools tractor' },
    { path: '/drought-dashboard', icon: FaExclamationTriangle, label: 'Drought Alert', keywords: 'drought water scarcity' },
    { path: '/ai-chat', icon: FaRobot, label: 'AI Chat Assistant', keywords: 'gemini bot question' },
    { path: '/community-forum', icon: FaComments, label: 'Community Forum', keywords: 'discuss forum chat' },
    { path: '/settings', icon: FaCog, label: 'Settings', keywords: 'profile account preferences' },
];

const CommandPalette = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const filtered = pages.filter((p) => {
        const q = query.toLowerCase();
        return (
            p.label.toLowerCase().includes(q) ||
            p.keywords.toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        setQuery('');
        setSelectedIndex(0);
    }, [isOpen]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter' && filtered[selectedIndex]) {
                navigate(filtered[selectedIndex].path);
                onClose();
            } else if (e.key === 'Escape') {
                onClose();
            }
        },
        [filtered, selectedIndex, navigate, onClose]
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-xl bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200/50 dark:border-slate-700/50">
                            <FaSearch className="text-gray-400 text-lg" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search pages, crops, data..."
                                className="flex-1 bg-transparent text-gray-800 dark:text-white text-lg outline-none placeholder-gray-400"
                            />
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-80 overflow-y-auto py-2">
                            {filtered.length === 0 ? (
                                <div className="px-5 py-8 text-center text-gray-400">
                                    No results found for "{query}"
                                </div>
                            ) : (
                                filtered.map((page, i) => {
                                    const Icon = page.icon;
                                    return (
                                        <button
                                            key={page.path}
                                            onClick={() => {
                                                navigate(page.path);
                                                onClose();
                                            }}
                                            onMouseEnter={() => setSelectedIndex(i)}
                                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all ${i === selectedIndex
                                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                                                }`}
                                        >
                                            <div
                                                className={`p-2 rounded-lg ${i === selectedIndex
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/40'
                                                        : 'bg-gray-100 dark:bg-slate-800'
                                                    }`}
                                            >
                                                <Icon className="text-sm" />
                                            </div>
                                            <span className="font-medium">{page.label}</span>
                                            {i === selectedIndex && (
                                                <span className="ml-auto text-xs text-gray-400">↵ Enter</span>
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-gray-200/50 dark:border-slate-700/50 flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 font-mono text-[10px]">↑↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 font-mono text-[10px]">↵</kbd>
                                Open
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 font-mono text-[10px]">Esc</kbd>
                                Close
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
