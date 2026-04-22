import React from 'react';
import './Features.css';

const FarmPassport = () => {
  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">🆔 Digital Farm Passport</div>
          <div className="page-sub">Unique digital identity for each farm — QR code, crop records, officer visits</div>
        </div>
        <button className="f-btn f-btn-dark f-btn-sm">⬇ Download PDF</button>
      </div>

      <div className="g21">
        <div className="passport">
          <div className="pp-header">
            <div>
              <div className="pp-id">FARM PASSPORT · ID: DK-RJ-2024-001</div>
              <div className="pp-name">North Field (Wheat)</div>
              <div className="pp-loc">📍 Jaipur North, Rajasthan · Zone A1</div>
            </div>
            <div className="pp-qr">📱</div>
          </div>
          <div style={{height:'1px', background:'rgba(255,255,255,.1)', marginBottom:'14px'}}></div>
          <div className="pp-grid">
            <div className="pp-stat"><div className="pp-stat-lbl">Area</div><div className="pp-stat-val">2.4 Hectares</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">Current Crop</div><div className="pp-stat-val">Wheat (Raj-3077)</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">Health Index</div><div className="pp-stat-val" style={{color:'#86efac'}}>88% ↑</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">NDVI Score</div><div className="pp-stat-val" style={{color:'#86efac'}}>0.78</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">Soil Type</div><div className="pp-stat-val">Sandy Loam</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">Soil pH</div><div className="pp-stat-val">6.8 (Optimal)</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">Irrigation</div><div className="pp-stat-val">Drip System</div></div>
            <div className="pp-stat"><div className="pp-stat-lbl">Schemes</div><div className="pp-stat-val">3 Active</div></div>
          </div>
          <div className="pp-timeline" style={{marginTop:'14px'}}>
            <div className="ct" style={{color:'rgba(255,255,255,.5)', marginBottom:'8px'}}>Activity Log</div>
            {[
              {title: 'Soil Health Test · ICAR Lab Jaipur', date: 'JAN 2025 · pH 6.8 · N-Low · P-Med · K-High', color: '#22c55e'},
              {title: 'PM-KISAN Enrollment Renewed', date: 'MAR 2025 · ₹6,000/yr · Aadhaar linked', color: '#22c55e'},
              {title: 'Officer Visit · Ravi Kumar BDO', date: 'APR 2025 · Fertilizer advisory given', color: '#f59e0b'},
              {title: 'Wheat Sowing Season Started', date: 'OCT 2024 · Raj-3077 variety · 2.4 Ha', color: '#22c55e'},
              {title: 'Pest Alert — Aphid detected', date: 'FEB 2025 · Treated with Imidacloprid', color: '#ef4444'}
            ].map((ev, i) => (
              <div key={i} className="pp-event">
                <div className="pp-ev-dot" style={{background: ev.color}}></div>
                <div><div className="pp-ev-title">{ev.title}</div><div className="pp-ev-date">{ev.date}</div></div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', gap:'8px', marginTop:'16px'}}>
            <button className="f-btn f-btn-g f-btn-sm" style={{flex:1}}>📲 Share QR Code</button>
            <button className="f-btn f-btn-sm" style={{background:'rgba(255,255,255,.12)', color:'#fff', border:'none', cursor:'pointer'}}>📋 View All Records</button>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <div className="f-card">
            <div className="ct">All Farm Passports</div>
            <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
              <div style={{background:'var(--g5)', borderRadius:'10px', padding:'10px 12px', cursor:'pointer', border:'2px solid var(--g3)', display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><div style={{fontSize:'12px', fontWeight:'700'}}>North Field</div><div style={{fontSize:'10px', color:'var(--muted)'}}>DK-RJ-2024-001 · Wheat</div></div><div className="f-badge bg">Active</div></div>
              <div style={{background:'#fafafa', borderRadius:'10px', padding:'10px 12px', cursor:'pointer', border:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><div style={{fontSize:'12px', fontWeight:'600'}}>South Orchard</div><div style={{fontSize:'10px', color:'var(--muted)'}}>DK-RJ-2024-002 · Mustard</div></div><div className="f-badge ba">Review</div></div>
              <div style={{background:'#fafafa', borderRadius:'10px', padding:'10px 12px', cursor:'pointer', border:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><div style={{fontSize:'12px', fontWeight:'600'}}>Canal Side</div><div style={{fontSize:'10px', color:'var(--muted)'}}>DK-RJ-2024-003 · Millet</div></div><div className="f-badge bg">Active</div></div>
            </div>
          </div>
          <div className="f-card">
            <div className="ct">Scheme Enrollment Status</div>
            <div className="hbar"><div className="hbar-n">PM-KISAN<span className="hbar-sub">₹6,000/yr</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'100%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>✓</div></div>
            <div className="hbar"><div className="hbar-n">Soil Health Card<span className="hbar-sub">Free tests</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'100%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>✓</div></div>
            <div className="hbar"><div className="hbar-n">Fasal Bima<span className="hbar-sub">Crop insurance</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'50%', background:'#ca8a04'}}></div></div><div className="hbar-v" style={{color:'#ca8a04'}}>50%</div></div>
            <div className="hbar"><div className="hbar-n">KCC Credit<span className="hbar-sub">₹3L limit</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'100%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>✓</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmPassport;
