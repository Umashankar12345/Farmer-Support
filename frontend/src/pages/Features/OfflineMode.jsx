import React from 'react';
import './Features.css';

const OfflineMode = () => {
  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">📵 Offline & SMS Fallback Mode</div>
          <div className="page-sub">Designed for low-connectivity areas — all core features work without internet</div>
        </div>
      </div>

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

      <div className="grid3">
        <div className="f-card">
          <div className="ct">Offline Features Available <span className="f-badge bg">✓ Ready</span></div>
          <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
            {[
              {icon: '✅', title: 'View Crop Health Data', sub: 'Last 7 days cached locally'},
              {icon: '✅', title: 'Soil Health Records', sub: 'All historical data available offline'},
              {icon: '✅', title: 'Farm Passport (Read-only)', sub: 'QR code and field data cached'},
              {icon: '✅', title: 'Crop Recommendation (Cached)', sub: 'Last AI recommendation stored'},
              {icon: '❌', title: 'Live Mandi Prices', sub: 'Requires internet — use SMS fallback', error: true},
              {icon: '❌', title: 'AgriVoice AI (Live)', sub: 'Requires Groq API — use SMS advisory', error: true}
            ].map((item, i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', background: item.error ? '#fef2f2' : 'var(--g5)', borderRadius:'9px'}}>
                <span style={{fontSize:'14px'}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:'11px', fontWeight:'700', color: item.error ? '#991b1b' : 'inherit'}}>{item.title}</div>
                  <div style={{fontSize:'10px', color: item.error ? '#b91c1c' : 'var(--muted)'}}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="f-card">
          <div className="ct">SMS Advisory Commands <span className="f-badge bb">Toll Free</span></div>
          <div style={{background:'var(--slate)', borderRadius:'12px', padding:'14px', fontFamily:'var(--mono)', fontSize:'11px', color:'#86efac', lineHeight:'2'}}>
            <div><span style={{color:'#fde68a'}}>CROP</span> WHEAT → Wheat advice</div>
            <div><span style={{color:'#fde68a'}}>PEST</span> MUSTARD → Pest alerts</div>
            <div><span style={{color:'#fde68a'}}>PRICE</span> JAIPUR → Mandi prices</div>
            <div><span style={{color:'#fde68a'}}>SCHEME</span> → Active schemes</div>
            <div><span style={{color:'#fde68a'}}>WEATHER</span> → 3-day forecast</div>
            <div><span style={{color:'#fde68a'}}>SOIL</span> → Soil health tips</div>
            <div><span style={{color:'#fde68a'}}>HELP</span> → All commands</div>
          </div>
          <div style={{textAlign:'center', marginTop:'10px'}}>
            <div style={{fontSize:'16px', fontWeight:'800', color:'var(--g1)'}}>SMS to: 1800-180-1551</div>
            <div style={{fontSize:'11px', color:'var(--muted)', marginTop:'3px'}}>Free · Works on any phone · Hindi + English</div>
          </div>
        </div>

        <div className="f-card">
          <div className="ct">Low-Literacy Voice Mode</div>
          <div style={{textAlign:'center', padding:'16px 0'}}>
            <div style={{fontSize:'48px', marginBottom:'12px'}}>🎙</div>
            <div style={{fontSize:'14px', fontWeight:'700', marginBottom:'6px'}}>Press & Speak in Hindi</div>
            <div style={{fontSize:'11px', color:'var(--muted)', marginBottom:'14px', lineHeight:'1.5'}}>No typing needed. Whisper AI converts your voice to text and answers in Hindi.</div>
            <button className="f-btn f-btn-g" onClick={() => alert('🎙 Voice Mode activated')} style={{width:'100%'}}>🎙 Start Voice Advisory</button>
            <div style={{fontSize:'10px', color:'var(--muted)', marginTop:'8px'}}>Works offline for 20+ preloaded questions</div>
          </div>
          <div style={{background:'var(--g5)', borderRadius:'10px', padding:'10px', fontSize:'11px', color:'var(--muted)', lineHeight:'1.6'}}>
            <strong style={{color:'var(--g1)'}}>Designed for:</strong> Farmers with low digital literacy. Simple 3-button interface. Voice input, voice output. Available in 6 languages.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineMode;
