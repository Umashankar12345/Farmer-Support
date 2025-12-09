import React from 'react';

const Sidebar = ({ menuItems = [] }) => {
  const items = menuItems.length > 0 ? menuItems : [
    { name: "Dashboard", icon: "📊", active: true },
    { name: "My Farm", icon: "🏡" },
    { name: "Farm Mechanization", icon: "🚜" },
    { name: "Crop Sown Analysis", icon: "📈" },
    { name: "Crop Production", icon: "🌾" },
    { name: "Fertilizer Recommendations", icon: "🧪" },
    { name: "Post & Disease", icon: "🦠" },
    { name: "Drought", icon: "🌵" },
    { name: "Community Forum", icon: "💬" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        {items.map((item, index) => (
          <li key={index} className={`sidebar-item ${item.active ? 'active' : ''}`}>
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;