import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';
import useFarmStore from '../../store/farmStore';

const AIInsightCard = () => {
    const aiInsight = useFarmStore((s) => s.aiInsight);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 dark:from-violet-900/30 dark:via-purple-900/30 dark:to-fuchsia-900/30 border border-purple-200/40 dark:border-purple-700/30 backdrop-blur-xl px-6 py-4"
        >
            {/* Decorative gradient orb */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-full blur-2xl" />
            <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 rounded-full blur-xl" />

            <div className="relative flex items-center gap-4">
                <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
                    <FaLightbulb className="text-lg" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-0.5">
                        🧠 AI Insight of the Day
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-relaxed truncate">
                        {aiInsight}
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    Gemini AI
                </div>
            </div>
        </motion.div>
    );
};

export default AIInsightCard;
