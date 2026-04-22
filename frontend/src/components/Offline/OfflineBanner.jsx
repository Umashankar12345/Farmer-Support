import React from 'react';
import '../../pages/Features/Features.css';

const OfflineBanner = () => {
  return (
    <div className="features-root">
      <div className="offline-banner" style={{marginBottom:'20px'}}>
        <div className="ob-icon">📵</div>
        <div>
          <div className="ob-title">Offline Mode Active</div>
          <div className="ob-sub">Last synced: 2 hours ago · All data cached locally · SMS advisory available</div>
        </div>
        <div className="ob-right">
          <div className="ob-status">⚡ OFFLINE</div>
          <div className="ob-sms" onClick={() => alert('SMS advisory: Send keyword to 1800-180-1551')}>📱 SMS: 1800-180-1551</div>
        </div>
      </div>
    </div>
  );
};

export default OfflineBanner;
