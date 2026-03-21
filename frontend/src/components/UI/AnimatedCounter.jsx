import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 1500, prefix = '', suffix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const endVal = parseFloat(end) || 0;

        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * endVal);

            if (progress < 1) {
                countRef.current = requestAnimationFrame(animate);
            }
        };

        countRef.current = requestAnimationFrame(animate);

        return () => {
            if (countRef.current) cancelAnimationFrame(countRef.current);
        };
    }, [end, duration]);

    return (
        <span>
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
};

export default AnimatedCounter;
