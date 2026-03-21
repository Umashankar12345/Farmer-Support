import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ children, className = '', onClick, type = 'button', icon: Icon, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            className={`
        relative overflow-hidden group
        bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500
        text-white font-semibold py-3 px-6 rounded-xl
        shadow-md transition-all duration-300
        flex items-center justify-center gap-2
        ${className}
      `}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
    );
};

export default GradientButton;
