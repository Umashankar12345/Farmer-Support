import React from 'react';
import '../../pages/Features/Features.css';

const NotificationPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="notif-overlay" id="notif-overlay" onClick={onClose} style={{ pointerEvents: 'auto' }}>
      <div className={`notif-panel ${isOpen ? 'open' : ''}`} id="notif-panel" onClick={e => e.stopPropagation()}>
        <div className="np-hdr">
          <div className="np-title">🔔 Smart Notifications <span style={{ fontSize: '10px', opacity: '.7', marginLeft: '6px' }}>5 unread</span></div>
          <button className="np-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="np-item unread">
          <div className="np-unread-dot"></div>
          <div className="np-ic">💧</div>
          <div>
            <div className="np-title2">Irrigation Alert — North Field</div>
            <div className="np-sub">Soil moisture dropped to 32%. Wheat needs irrigation within 2 days to avoid stress.</div>
            <div className="np-time">2 min ago · AI Sensor</div>
          </div>
        </div>

        <div className="np-item unread">
          <div className="np-unread-dot"></div>
          <div className="np-ic">💰</div>
          <div>
            <div className="np-title2">PM-KISAN Payment Credited</div>
            <div className="np-sub">₹2,000 installment (16th) has been credited to your bank account.</div>
            <div className="np-time">1 hr ago · PM-KISAN Portal</div>
          </div>
        </div>

        <div className="np-item unread">
          <div className="np-unread-dot"></div>
          <div className="np-ic">🐛</div>
          <div>
            <div className="np-title2">Pest Outbreak — Your District</div>
            <div className="np-sub">Armyworm outbreak detected in Jaipur North. 3 farms within 5km affected.</div>
            <div className="np-time">3 hrs ago · Regional Alert</div>
          </div>
        </div>

        <div className="np-item">
          <div className="np-ic">⛈</div>
          <div>
            <div className="np-title2">Heavy Rain Warning</div>
            <div className="np-sub">IMD forecasts 80mm rain Wed–Thu. Delay fertilizer, harvest wheat by Tuesday.</div>
            <div className="np-time">5 hrs ago · IMD API</div>
          </div>
        </div>

        <div className="np-item">
          <div className="np-ic">🌾</div>
          <div>
            <div className="np-title2">AI Crop Recommendation Ready</div>
            <div className="np-sub">Based on your soil data and market prices, Mustard (Pusa) is recommended for Rabi season.</div>
            <div className="np-time">6 hrs ago · Crop Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
