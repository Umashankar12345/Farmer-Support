import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sections = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', icon: '🏠', path: '/' },
        { name: 'AI Query', icon: '🤖', path: '/query' },
        { name: 'My Farms', icon: '🚜', path: '/farms' },
      ]
    },
    {
      title: 'Alerts & Tools',
      items: [
        { name: 'Weather', icon: '🌦️', path: '/weather' },
        { name: 'Pest Alert', icon: '🐛', path: '/pest' }, // Mock path
        { name: 'Disease Detector', icon: '📸', path: '/query#disease' },
      ]
    },
    {
      title: 'Analytics',
      items: [
        { name: 'Market (eNAM)', icon: '📈', path: '/analytics' },
        { name: 'Soil History', icon: '🧪', path: '/farms#soil' },
      ]
    },
    {
      title: 'Advanced Features',
      items: [
        { name: 'Crop Recommender', icon: '🌱', path: '/crop-rec' },
        { name: 'Income / ROI', icon: '📊', path: '/roi' },
        { name: 'NDVI Satellite', icon: '🛰', path: '/ndvi' },
        { name: 'Yield Prediction', icon: '📈', path: '/yield' },
        { name: 'Community Feed', icon: '🤝', path: '/community' },
        { name: 'Farm Passport', icon: '🆔', path: '/passport' },
        { name: 'Farmer Journey', icon: '🚀', path: '/onboard' },
        { name: 'Offline Mode', icon: '📵', path: '/offline' },
      ]
    },
    {
      title: 'Support',
      items: [
        { name: 'Gov Schemes', icon: '🏛️', path: '/schemes' },
        { name: 'Human Officer', icon: '👤', path: '/support' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-100 flex flex-col sticky top-0 overflow-y-auto pt-20">
      <div className="px-6 mb-8 mt-4">
        <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3 border border-green-100 group hover:border-green-300 transition-all cursor-pointer">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl shadow-lg shadow-green-100">👨‍🌾</div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">Umashankar</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Certified Partner</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group
                      ${isActive
                        ? 'bg-green-50 text-green-700 shadow-sm border border-green-100'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gray-900 rounded-xl p-4 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-green-400 uppercase mb-1">System Health</p>
            <p className="text-xs font-medium">Precision AI: 94.2%</p>
          </div>
          <div className="absolute -right-2 -bottom-2 opacity-10 text-4xl group-hover:scale-125 transition-transform">⚙️</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;