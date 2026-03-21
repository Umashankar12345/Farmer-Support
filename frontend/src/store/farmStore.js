import { create } from 'zustand';

const useFarmStore = create((set) => ({
    // Active metric for smart analytics mini-cards
    activeMetric: 'weather',
    setActiveMetric: (metric) => set({ activeMetric: metric }),

    // Chart time range toggle
    chartTimeRange: 'yearly',
    setChartTimeRange: (range) => set({ chartTimeRange: range }),

    // Last synced timestamp
    lastSynced: new Date(),
    updateLastSynced: () => set({ lastSynced: new Date() }),

    // AI Insight of the Day
    aiInsight: 'Predictive analysis suggests harvesting Wheat in 3 days for maximum yield.',
    setAiInsight: (insight) => set({ aiInsight: insight }),

    // Farm fields for map polygons
    farmFields: [
        {
            id: 1,
            name: 'Wheat Field A',
            crop: 'Wheat',
            moisture: 72,
            pestAlert: false,
            color: '#22c55e',
            positions: [
                [28.6139, 77.2090],
                [28.6160, 77.2090],
                [28.6160, 77.2120],
                [28.6139, 77.2120],
            ],
        },
        {
            id: 2,
            name: 'Rice Paddy B',
            crop: 'Rice',
            moisture: 85,
            pestAlert: false,
            color: '#3b82f6',
            positions: [
                [28.6165, 77.2090],
                [28.6185, 77.2090],
                [28.6185, 77.2115],
                [28.6165, 77.2115],
            ],
        },
        {
            id: 3,
            name: 'Corn Field C',
            crop: 'Corn',
            moisture: 45,
            pestAlert: true,
            color: '#eab308',
            positions: [
                [28.6139, 77.2125],
                [28.6158, 77.2125],
                [28.6158, 77.2155],
                [28.6139, 77.2155],
            ],
        },
        {
            id: 4,
            name: 'Vegetable Plot D',
            crop: 'Vegetables',
            moisture: 30,
            pestAlert: true,
            color: '#ef4444',
            positions: [
                [28.6162, 77.2120],
                [28.6182, 77.2120],
                [28.6182, 77.2150],
                [28.6162, 77.2150],
            ],
        },
    ],

    // Chart datasets for different metrics
    metricData: {
        weather: {
            label: 'Temperature (°C)',
            monthly: [
                { name: 'Jan', value: 15, lastYear: 14 },
                { name: 'Feb', value: 18, lastYear: 16 },
                { name: 'Mar', value: 24, lastYear: 22 },
                { name: 'Apr', value: 32, lastYear: 30 },
                { name: 'May', value: 38, lastYear: 36 },
                { name: 'Jun', value: 40, lastYear: 39 },
            ],
            yearly: [
                { name: '2020', value: 28, lastYear: 27 },
                { name: '2021', value: 29, lastYear: 28 },
                { name: '2022', value: 27, lastYear: 29 },
                { name: '2023', value: 30, lastYear: 27 },
                { name: '2024', value: 29, lastYear: 30 },
                { name: '2025', value: 31, lastYear: 29 },
            ],
        },
        irrigation: {
            label: 'Water Usage (KL)',
            monthly: [
                { name: 'Jan', value: 120, lastYear: 110 },
                { name: 'Feb', value: 100, lastYear: 105 },
                { name: 'Mar', value: 150, lastYear: 140 },
                { name: 'Apr', value: 200, lastYear: 180 },
                { name: 'May', value: 250, lastYear: 230 },
                { name: 'Jun', value: 300, lastYear: 280 },
            ],
            yearly: [
                { name: '2020', value: 1200, lastYear: 1100 },
                { name: '2021', value: 1350, lastYear: 1200 },
                { name: '2022', value: 1280, lastYear: 1350 },
                { name: '2023', value: 1400, lastYear: 1280 },
                { name: '2024', value: 1320, lastYear: 1400 },
                { name: '2025', value: 1500, lastYear: 1320 },
            ],
        },
        soil: {
            label: 'Soil pH',
            monthly: [
                { name: 'Jan', value: 6.5, lastYear: 6.3 },
                { name: 'Feb', value: 6.8, lastYear: 6.5 },
                { name: 'Mar', value: 7.0, lastYear: 6.8 },
                { name: 'Apr', value: 6.9, lastYear: 7.0 },
                { name: 'May', value: 6.7, lastYear: 6.9 },
                { name: 'Jun', value: 6.6, lastYear: 6.7 },
            ],
            yearly: [
                { name: '2020', value: 6.5, lastYear: 6.4 },
                { name: '2021', value: 6.7, lastYear: 6.5 },
                { name: '2022', value: 6.8, lastYear: 6.7 },
                { name: '2023', value: 6.6, lastYear: 6.8 },
                { name: '2024', value: 6.9, lastYear: 6.6 },
                { name: '2025', value: 7.0, lastYear: 6.9 },
            ],
        },
        inventory: {
            label: 'Stock (Tons)',
            monthly: [
                { name: 'Jan', value: 50, lastYear: 45 },
                { name: 'Feb', value: 42, lastYear: 40 },
                { name: 'Mar', value: 55, lastYear: 48 },
                { name: 'Apr', value: 38, lastYear: 35 },
                { name: 'May', value: 60, lastYear: 52 },
                { name: 'Jun', value: 70, lastYear: 60 },
            ],
            yearly: [
                { name: '2020', value: 320, lastYear: 300 },
                { name: '2021', value: 350, lastYear: 320 },
                { name: '2022', value: 340, lastYear: 350 },
                { name: '2023', value: 380, lastYear: 340 },
                { name: '2024', value: 360, lastYear: 380 },
                { name: '2025', value: 400, lastYear: 360 },
            ],
        },
    },
}));

export default useFarmStore;
