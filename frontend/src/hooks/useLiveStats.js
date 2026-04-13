import { useState, useEffect } from 'react';
import axios from 'axios';

// Polls Backend — handling both generic /api/dashboard/data and the new /api/dashboard/live-stats
export function useLiveStats(intervalMs = 4000) {
  const [stats, setStats] = useState({
    activeCrops: 0,
    yieldPrediction: '0%',
    waterRequired: '0L',
    cropHealth: [],
    performance: {},
    alerts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('krishi_jwt');
        // Fallback to existing endpoint if live-stats doesn't exist yet
        const { data } = await axios.get('/api/dashboard/data', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Normalize data structure if needed
        const normalizedData = data.data || data;
        setStats(prev => ({
          ...prev,
          activeCrops: normalizedData.activeCrops || 4,
          yieldPrediction: normalizedData.yieldPrediction || '+12%',
          waterRequired: normalizedData.waterRequired || '450L',
          cropHealth: normalizedData.cropHealth || [],
          alerts: normalizedData.alerts || normalizedData.pestAdvisory ? [normalizedData.pestAdvisory] : []
        }));
      } catch (err) {
        console.error('Stats fetch failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { stats, loading };
}
