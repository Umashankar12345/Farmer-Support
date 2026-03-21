import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={hoverEffect ? {
                y: -6,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 30px -5px rgba(16, 185, 129, 0.08)',
                transition: { duration: 0.25, ease: 'easeOut' }
            } : {}}
            className={`glass-card bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg rounded-2xl p-6 transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
