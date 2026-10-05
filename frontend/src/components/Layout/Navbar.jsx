import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationPanel from '../Notifications/NotificationPanel';

const getLocationTickers = () => {
  let state = "Punjab";
  let dist = "Local";
  try {
    const loc = JSON.parse(localStorage.getItem("farmer_location") || "{}");
    if (loc.state) state = loc.state;
    if (loc.district) dist = loc.district;
  } catch (e) {}

  if (state === "Bihar") {
    return [
      `🌾 Bihar Mandi: KMS Paddy procurement active across ${dist} Mandis at official MSP ₹2,389/qtl.`,
      `🚜 BAU Sabour & RPCAU Advisory: Drain standing water 10-12 days before combine harvesting.`,
      `☀️ Weather: Sunny spells favorable for paddy grain ripening and field drying.`,
      `🌱 Rabi Tip: Wheat sowing window in Bihar is mid-late Nov (Nov 15-Dec 10). Procure seeds (HD-2967, DBW-187) now.`,
      `💧 Field Steps: Plank (pata) immediately after harvest to conserve moisture for Lentil/Mustard.`,
      `🏛️ PM-KISAN: Verify DBT beneficiary bank account status on pmkisan.gov.in.`
    ];
  }

  if (state === "Punjab" || state === "Haryana") {
    return [
      `🌾 Mandi: Grade A Paddy trading at ₹2,389/qtl official MSP across ${dist} Mandis.`,
      `🚜 PAU Advisory: Recommended wheat sowing window is Oct 25 – Nov 15 when temp drops below 22°C.`,
      `☀️ Weather: Clear skies ideal for combine harvesting & grain sun-drying.`,
      `⚠️ Moisture: Keep paddy moisture below 17% for maximum government procurement price.`,
      `🌱 CRM Advisory: Deploy Super Seeder / Smart Seeder for in-situ stubble management.`,
      `🏛️ PM-KISAN: Verify DBT beneficiary status on official portal pmkisan.gov.in.`
    ];
  }

  return [
    `🌾 Mandi: Official KMS 2025-26 MSP benchmark at ₹2,369 (Common) and ₹2,389 (Grade A) per quintal.`,
    `🚜 ICAR Advisory: Harvest mature Kharif crops and sun-dry grains below 17% moisture.`,
    `☀️ Weather: Utilize clear weather windows for timely harvest and field preparation.`,
    `🌱 Rabi Seed Tip: Procure certified seeds from State Seed Corporation or local KVK.`,
    `💧 Soil Moisture: Conserve post-monsoon residual moisture by prompt planking.`,
    `🏛️ PM-KISAN: Official DBT helpline: 155261 / 1800-115-526.`
  ];
};

const Navbar = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [tickers, setTickers] = useState(getLocationTickers);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 6000);

    const handleLocationChange = () => {
      const updated = getLocationTickers();
      setTickers(updated);
      setTickerIndex(0);
    };
    window.addEventListener('storage', handleLocationChange);
    window.addEventListener('farmer_location_change', handleLocationChange);

    return () => {
      clearInterval(timer);
      clearInterval(tickerTimer);
      window.removeEventListener('storage', handleLocationChange);
      window.removeEventListener('farmer_location_change', handleLocationChange);
    };
  }, [tickers.length]);

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