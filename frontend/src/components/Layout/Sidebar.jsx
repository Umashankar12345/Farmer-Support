import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants/translations';

const Sidebar = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('krishi_lang') || 'en');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      setLang(localStorage.getItem('krishi_lang') || 'en');
    };
    const handleToggle = () => setMobileOpen(prev => !prev);
    const handleClose = () => setMobileOpen(false);

    window.addEventListener('storage', handleStorage);
    window.addEventListener('krishi_lang_change', handleStorage);
    window.addEventListener('toggle-mobile-sidebar', handleToggle);
    window.addEventListener('close-mobile-sidebar', handleClose);
    const interval = setInterval(handleStorage, 1000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('krishi_lang_change', handleStorage);
      window.removeEventListener('toggle-mobile-sidebar', handleToggle);
      window.removeEventListener('close-mobile-sidebar', handleClose);
      clearInterval(interval);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const sections = [
    {
      title: t.main,
      items: [
        { name: t.dashboardMenu, icon: '🏠', path: '/' },
        { name: t.aiQuery, icon: '🤖', path: '/query' },
        { name: t.myFarms, icon: '🚜', path: '/farms' },
      ]
    },
    {
      title: t.alertsTools,
      items: [
        { name: t.weather, icon: '🌦️', path: '/weather' },
        { name: t.pestAlert, icon: '🐛', path: '/pest' },
        { name: t.diseaseDetector, icon: '📸', path: '/disease' },
      ]
    },
    {
      title: t.analytics,
      items: [
        { name: t.market, icon: '📊', path: '/analytics' },
        { name: 'Live Mandi', icon: '📈', path: '/market-explorer' }
      ]
    },
    {
      title: t.advanced,
      items: [
        { name: t.cropRec, icon: '🌱', path: '/crop-rec' },
        { name: t.incomeRoi, icon: '📊', path: '/roi' },
        { name: t.ndvi, icon: '🛰', path: '/ndvi' },
        { name: t.yieldPred, icon: '📈', path: '/yield' },
        { name: t.community, icon: '🤝', path: '/community' },
        { name: t.passport, icon: '🆔', path: '/passport' },
        { name: t.journey, icon: '🚀', path: '/onboard' },
        { name: t.offline, icon: '📵', path: '/offline' },
      ]
    },
    {
      title: t.support,
      items: [
        { name: t.schemes, icon: '🏛️', path: '/schemes' },
        { name: t.officer, icon: '👤', path: '/support' },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Admin Console', icon: '🛡️', path: '/admin' },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    setMobileOpen(false);
    navigate('/login');
  };

  const getFarmerName = () => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      return u.firstName || (u.name ? u.name.split(' ')[0] : '') || t.farmerFallback || 'Gurpreet';
    } catch (e) {
      return t.farmerFallback || 'Gurpreet';
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header Profile */}
      <div className="px-5 mb-6 mt-3">
        <div className="flex items-center justify-between md:hidden mb-3">
          <span className="font-bold text-base text-emerald-900">🌾 Digital Krishi</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-3 border border-emerald-200 shadow-sm">
          <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-md">
            👨‍🌾
          </div>
          <div className="overflow-hidden">
            <p className="text-base font-extrabold text-slate-900 truncate">
              {getFarmerName()}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                {t.partner}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="px-3 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group
                      ${isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'}
                    `}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
          >
            <span className="text-lg">🚪</span>
            {t.logout}
          </button>
        </div>
      </nav>

      {/* System Status Footprint */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-xl p-3.5 text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {t.statusOnline}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <p className="text-xs text-slate-300">
            {t.allServicesOperational}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 bg-white h-screen border-r border-slate-200 flex-col sticky top-0 overflow-y-auto pt-2 z-30 shadow-sm">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col pt-4">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;