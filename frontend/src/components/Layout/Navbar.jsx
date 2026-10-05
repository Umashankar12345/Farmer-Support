import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationPanel from '../Notifications/NotificationPanel';

const TICKERS = [
  '🌾 Mandi: Paddy PR-126 trading at ₹2,380/qtl at Khanna mandi.',
  '🚜 Advisory: Deploy Super Seeder for direct wheat sowing — zero stubble burning.',
  '☀️ Weather: Clear skies ideal for combine harvesting & grain drying.',
  '⚠️ Alert: Keep paddy moisture below 17% for maximum procurement price.',
  '🌱 Tip: Treat wheat seed with Trichoderma / Vitavax before next week sowing.',
  '🏛️ PM-KISAN: Next installment scheduled for release this month.'
];

const Navbar = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKERS.length);
    }, 6000);
    return () => {
      clearInterval(timer);
      clearInterval(tickerTimer);
    };
  }, []);

  const formatTime = (n) => {
    let h = n.getHours(), m = n.getMinutes(), s = n.getSeconds(), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s} ${ap}`;
  };

  const formatDate = (n) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${days[n.getDay()]}, ${n.getDate()} ${months[n.getMonth()]} ${n.getFullYear()}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('krishi_jwt');
    navigate('/login');
  };

  const getUserInitials = () => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      if (u.firstName) return u.firstName.substring(0, 2).toUpperCase();
      if (u.name) return u.name.substring(0, 2).toUpperCase();
    } catch (e) {}
    return 'KS';
  };

  return (
    <>
      <div className="topbar">
        {/* Left: Hamburger (Mobile) + Brand */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'))}
            className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="text-xl">☰</span>
          </button>
          <div className="top-brand cursor-pointer" onClick={() => navigate('/')}>
            🌾 DIGITAL KRISHI
          </div>
        </div>

        {/* Center: Live Ticker (hidden on small phones, visible on sm and up) */}
        <div className="top-ticker hidden sm:flex">
          <div className="ticker-dot shrink-0"></div>
          <span className="truncate">{TICKERS[tickerIndex]}</span>
        </div>

        {/* Right: Real Date/Time + Notifications + User Avatar */}
        <div className="top-right">
          <div className="top-time">
            <div className="t1">{formatTime(time)}</div>
            <div className="t2">{formatDate(time)}</div>
          </div>
          <div
            className="top-notif"
            onClick={() => setIsNotifOpen(true)}
            title="Notifications"
          >
            🔔<div className="notif-badge"></div>
          </div>
          <div
            className="top-avatar"
            title="Click to Logout"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            {getUserInitials()}
          </div>
        </div>
      </div>
      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

export default Navbar;