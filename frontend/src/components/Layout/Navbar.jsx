import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationPanel from '../Notifications/NotificationPanel';

const TICKERS = [
  'Forecast: 80% chance of light rain tomorrow evening.',
  'Alert: PM-KISAN 16th installment credited to your account.',
  'Tip: High moisture detected, skip morning irrigation for Farm A.',
  'Market: Mustard prices up 2.4% today at Alwar mandi.',
  'Advisory: Apply Zinc Sulphate to boost mustard yield by 12%.',
  'Weather: Heavy rain expected Wed-Thu. Harvest wheat by Tuesday.'
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
    }, 7000);
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
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${days[n.getDay()]}, ${n.getDate()} ${months[n.getMonth()]}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('krishi_jwt');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      <div className="topbar">
        <div className="top-brand">DIGITAL KRISHI</div>
        <div className="top-ticker">
          <div className="ticker-dot"></div>
          <span>{TICKERS[tickerIndex]}</span>
        </div>
        <div className="top-right">
          <div className="top-time">
            <div className="t1">{formatTime(time)}</div>
            <div className="t2">{formatDate(time)}</div>
          </div>
          <div className="top-notif" onClick={() => setIsNotifOpen(true)}>
            🔔<div className="notif-badge"></div>
          </div>
          <div className="top-avatar" title="Click to Logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            {user.firstName ? user.firstName.substring(0, 2).toUpperCase() : 'US'}
          </div>
        </div>
      </div>
      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

export default Navbar;