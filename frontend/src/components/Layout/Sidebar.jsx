// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { 
//   FaTachometerAlt, 
//   FaLeaf, 
//   FaFlask, 
//   FaCloudSun, 
//   FaBug, 
//   FaLandmark,
//   FaCalendarAlt,
//   FaChartLine,
//   FaTractor,
//   FaExclamationTriangle,
//   FaUser,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes
// } from 'react-icons/fa';
// import './Sidebar.css';

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const menuItems = [
//     { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
//     { path: '/my-farm', icon: <FaLeaf />, label: 'My Farm' },
//     { path: '/fertilizer', icon: <FaFlask />, label: 'Fertilizer Recommendations' },
//     { path: '/weather', icon: <FaCloudSun />, label: 'Weather Forecast' },
//     { path: '/pest-disease', icon: <FaBug />, label: 'Pest & Disease' },
//     { path: '/government-schemes', icon: <FaLandmark />, label: 'Government Schemes' },
//     { path: '/crop-calendar', icon: <FaCalendarAlt />, label: 'Crop Calendar' },
//     { path: '/crop-sown-analysis', icon: <FaChartLine />, label: 'Crop Sown Analysis' },
//     { path: '/farm-mechanization', icon: <FaTractor />, label: 'Farm Mechanization' },
//     { path: '/drought-dashboard', icon: <FaExclamationTriangle />, label: 'Drought Alert' },
//     { path: '/ai-chat', icon: <FaUser />, label: 'AI Chat Assistant' },
//     { path: '/community-forum', icon: <FaUser />, label: 'Community Forum' },
//     { path: '/settings', icon: <FaUser />, label: 'Settings' },
//   ];

//   const userName = user?.name || localStorage.getItem('userName') || 'Farmer User';
//   const userEmail = user?.email || localStorage.getItem('userEmail') || 'farmer@example.com';

//   return (
//     <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       {/* Sidebar Header */}
//       <div className="sidebar-header">
//         <div className="sidebar-brand">
//           <h2 className="sidebar-title green-text">Digital Krishi Officer</h2>
//         </div>
//         <button className="sidebar-toggle" onClick={toggleSidebar}>
//           {isOpen ? <FaTimes className="green-text" /> : <FaBars className="green-text" />}
//         </button>
//       </div>

//       {/* Welcome Section */}
//       <div className="welcome-section">
//         <h3 className="green-text">Welcome back</h3>
//         <p className="login-time green-text">Last login: Today</p>
//       </div>

//       {/* User Info */}
//       <div className="user-info">
//         <div className="user-avatar green-bg">
//           <span className="avatar-text">{userName.charAt(0).toUpperCase()}</span>
//         </div>
//         <div className="user-details">
//           <h3 className="user-name green-text">{userName}</h3>
//           <p className="user-email green-text">{userEmail}</p>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="sidebar-nav">
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.path}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
//                 end={item.path === '/dashboard'}
//               >
//                 <span className="nav-icon green-text">{item.icon}</span>
//                 {isOpen && <span className="nav-label green-text">{item.label}</span>}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Logout Button */}
//       <div className="sidebar-footer">
//         <button 
//           className="logout-btn"
//           onClick={handleLogout}
//         >
//           <FaSignOutAlt className="green-text" />
//           {isOpen && <span className="green-text">Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt,
  FaLeaf,
  FaFlask,
  FaCloudSun,
  FaBug,
  FaLandmark,
  FaCalendarAlt,
  FaChartLine,
  FaTractor,
  FaExclamationTriangle,
  FaRobot,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'umashankar...';

  const menuItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/my-farm', icon: <FaLeaf />, label: 'My Farm' },
    { path: '/fertilizer', icon: <FaFlask />, label: 'Fertilizer Recommendations' },
    { path: '/weather', icon: <FaCloudSun />, label: 'Weather Forecast' },
    { path: '/pest-disease', icon: <FaBug />, label: 'Pest & Disease' },
    { path: '/government-schemes', icon: <FaLandmark />, label: 'Government Schemes' },
    { path: '/crop-calendar', icon: <FaCalendarAlt />, label: 'Crop Calendar' },
    { path: '/crop-sown-analysis', icon: <FaChartLine />, label: 'Crop Sown Analysis' },
    { path: '/farm-mechanization', icon: <FaTractor />, label: 'Farm Mechanization' },
    { path: '/drought-dashboard', icon: <FaExclamationTriangle />, label: 'Drought Alert' },
    { path: '/ai-chat', icon: <FaRobot />, label: 'AI Chat Assistant' },
    { path: '/community-forum', icon: <FaComments />, label: 'Community Forum' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const sidebarVariants = {
    open: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { width: "5rem", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, display: "block", transition: { delay: 0.1 } },
    closed: { opacity: 0, x: -10, transitionEnd: { display: "none" } }
  };

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed left-0 top-0 h-screen z-50 glass border-r border-white/20 dark:border-slate-700/50 flex flex-col shadow-2xl"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 mb-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent truncate"
            >
              Digital Krishi
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors text-emerald-600 dark:text-emerald-400"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* User Info */}
      <div className="px-3 mb-6">
        <div className={`flex items-center p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 border border-emerald-100 dark:border-slate-700 ${!isOpen && 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
            <FaUser />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={itemVariants}
                className="ml-3 overflow-hidden"
              >
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Farmer User</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-32">{userEmail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 scrollbar-hide py-2">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-3 rounded-xl transition-all duration-300 group
                  ${isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }
                `}
              >
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      variants={itemVariants}
                      className="ml-3 font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active Indicator Dot */}
                {!isOpen && isActive && (
                  <div className="absolute right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-700/50">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center p-3 rounded-xl transition-all duration-300
            text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
            ${!isOpen && 'justify-center'}
          `}
        >
          <FaSignOutAlt className="text-xl" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                variants={itemVariants}
                className="ml-3 font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   FaTachometerAlt,
//   FaLeaf,
//   FaFlask,
//   FaCloudSun,
//   FaBug,
//   FaLandmark,
//   FaCalendarAlt,
//   FaChartLine,
//   FaTractor,
//   FaExclamationTriangle,
//   FaUser,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
//   FaComments,
//   FaRobot
// } from 'react-icons/fa';
// import './Sidebar.css';

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem('userEmail') || 'umashankarkumar9572@gm';

//   const menuItems = [
//     { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
//     { path: '/my-farm', icon: <FaLeaf />, label: 'My Farm' },
//     { path: '/fertilizer', icon: <FaFlask />, label: 'Fertilizer Recommendations' },
//     { path: '/weather', icon: <FaCloudSun />, label: 'Weather Forecast' },
//     { path: '/pest-disease', icon: <FaBug />, label: 'Pest & Disease' },
//     { path: '/government-schemes', icon: <FaLandmark />, label: 'Government Schemes' },
//     { path: '/crop-calendar', icon: <FaCalendarAlt />, label: 'Crop Calendar' },
//     { path: '/crop-sown-analysis', icon: <FaChartLine />, label: 'Crop Sown Analysis' },
//     { path: '/farm-mechanization', icon: <FaTractor />, label: 'Farm Mechanization' },
//     { path: '/drought-dashboard', icon: <FaExclamationTriangle />, label: 'Drought Alert' },
//     { path: '/ai-chat', icon: <FaRobot />, label: 'AI Chat Assistant' },
//     { path: '/community-forum', icon: <FaComments />, label: 'Community Forum' },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       {/* Top Section */}
//       <div className="sidebar-top">
//         {/* Sidebar Header */}
//         <div className="sidebar-header">
//           <div className="sidebar-brand">
//             {isOpen && <h2 className="sidebar-title green-text">Digital Krishi Officer</h2>}
//           </div>
//           <button className="sidebar-toggle" onClick={toggleSidebar}>
//             {isOpen ? <FaTimes className="green-text" /> : <FaBars className="green-text" />}
//           </button>
//         </div>

//         {/* User Info - Only show when sidebar is open */}
//         {isOpen && (
//           <div className="user-info">
//             <div className="user-avatar green-bg">
//               <FaUser />
//             </div>
//             <div className="user-details">
//               <h3 className="user-name green-text">Farmer User</h3>
//               <p className="user-email green-text">{userEmail}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Middle Section - Navigation Menu (Scrollable) */}
//       <div className="sidebar-middle">
//         <nav className="sidebar-nav">
//           <ul>
//             {menuItems.map((item) => (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
//                 >
//                   <span className="nav-icon green-text">{item.icon}</span>
//                   {isOpen && <span className="nav-label green-text">{item.label}</span>}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Bottom Section - Logout Button (Fixed at Bottom) */}
//       <div className="sidebar-bottom">
//         <button
//           className="logout-btn"
//           onClick={handleLogout}
//         >
//           <FaSignOutAlt className="green-text" />
//           {isOpen && <span className="logout-text green-text">Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;