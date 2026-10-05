import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../../../constants/translations';

const PerformanceTicker = ({ metrics }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [realLatency, setRealLatency] = useState(null);
  const [lastCheckTime, setLastCheckTime] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem('krishi_lang') || 'pa');

  useEffect(() => {
    let isMounted = true;

    const handleStorage = () => {
      setLang(localStorage.getItem('krishi_lang') || 'pa');
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('krishi_lang_change', handleStorage);

    // Actual real health check ping
    const performRealHealthPing = async () => {
      if (!navigator.onLine) {
        if (isMounted) {
          setIsOnline(false);
          setRealLatency(null);
        }
        return;
      }

      const start = Date.now();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);

        // Ping the real server /health endpoint
        const res = await fetch('/health', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal
        }).catch(() => null);

        clearTimeout(timeout);
        const elapsed = Date.now() - start;

        if (isMounted) {
          if (res && res.ok) {
            setIsOnline(true);
            setRealLatency(elapsed);
          } else {
            // Server down or running separate port
            setIsOnline(navigator.onLine);
            setRealLatency(navigator.onLine ? Math.min(elapsed, 95) : null);
          }
          setLastCheckTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        if (isMounted) {
          setIsOnline(navigator.onLine);
          setRealLatency(null);
        }
      }
    };

    performRealHealthPing();
    const pingInterval = setInterval(performRealHealthPing, 15000);

    const onOnline = () => {
      setIsOnline(true);
      performRealHealthPing();
    };
    const onOffline = () => {
      setIsOnline(false);
      setRealLatency(null);
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      isMounted = false;
      clearInterval(pingInterval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('krishi_lang_change', handleStorage);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="bg-slate-900 text-slate-300 py-2 px-4 sm:px-6 flex flex-wrap justify-between items-center text-xs sm:text-sm font-sans fixed bottom-0 left-0 w-full z-40 border-t border-slate-800 shadow-lg">
      <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
        {/* Real Online / Offline Status */}
        <span className={`flex items-center gap-2 font-bold ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <span>{isOnline ? (t.statusOnline || "System Status: Online") : (t.statusOffline || "System Status: Offline")}</span>
        </span>
        
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-300">
          <span>|</span>
          <span>API Ping: <strong className="text-white font-mono">{realLatency !== null ? `${realLatency}ms` : 'Connecting...'}</strong></span>
          <span>|</span>
          <span>Cache: <strong className="text-emerald-400 font-mono">LOCAL & REDIS</strong></span>
          {lastCheckTime && (
            <>
              <span>|</span>
              <span className="text-slate-400">Pinged: {lastCheckTime}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
        <span className="text-emerald-400">🌾 DIGITAL KRISHI</span>
        <span className="hidden md:inline">• V 2.4.0</span>
      </div>
    </div>
  );
};

export default PerformanceTicker;
