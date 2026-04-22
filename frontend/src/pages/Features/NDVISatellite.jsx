import React from 'react';
import './Features.css';

const NDVISatellite = () => {
  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">🛰 NDVI Satellite Crop Health Map</div>
          <div className="page-sub">Field-level vegetation index · Green = Healthy · Red = Stressed</div>
        </div>
        <button className="f-btn f-btn-dark f-btn-sm">📡 Refresh Satellite</button>
      </div>

      <div className="g21">
        <div className="f-card">
          <div className="ct">North Field — Wheat · Zone A1 <span className="f-badge bg">NDVI 0.78</span></div>
          <div className="ndvi-wrap">
            <svg viewBox="0 0 400 220" width="100%" height="100%" style={{position:'absolute', inset:0}}>
              <defs>
                <radialGradient id="stress1" cx="70%" cy="30%" r="25%"><stop offset="0%" stopColor="#ef4444" stopOpacity=".8"/><stop offset="100%" stopColor="#16a34a" stopOpacity="0"/></radialGradient>
                <radialGradient id="stress2" cx="20%" cy="75%" r="15%"><stop offset="0%" stopColor="#f59e0b" stopOpacity=".7"/><stop offset="100%" stopColor="#16a34a" stopOpacity="0"/></radialGradient>
              </defs>
              <rect width="400" height="220" fill="#052e16"/>
              <rect x="10" y="10" width="380" height="200" rx="8" fill="#064e1e"/>
              
              {/* NDVI grid cells - Simplified SVG generation */}
              {[
                {x:15, y:15, w:55, h:40, f:'#16a34a'}, {x:75, y:15, w:55, h:40, f:'#22c55e'}, {x:135, y:15, w:55, h:40, f:'#15803d'}, {x:195, y:15, w:55, h:40, f:'#ef4444'}, {x:255, y:15, w:55, h:40, f:'#dc2626'}, {x:315, y:15, w:70, h:40, f:'#f59e0b'},
                {x:15, y:62, w:55, h:40, f:'#22c55e'}, {x:75, y:62, w:55, h:40, f:'#16a34a'}, {x:135, y:62, w:55, h:40, f:'#15803d'}, {x:195, y:62, w:55, h:40, f:'#ca8a04'}, {x:255, y:62, w:55, h:40, f:'#16a34a'}, {x:315, y:62, w:70, h:40, f:'#16a34a'},
                {x:15, y:109, w:55, h:40, f:'#15803d'}, {x:75, y:109, w:55, h:40, f:'#16a34a'}, {x:135, y:109, w:55, h:40, f:'#22c55e'}, {x:195, y:109, w:55, h:40, f:'#16a34a'}, {x:255, y:109, w:55, h:40, f:'#15803d'}, {x:315, y:109, w:70, h:40, f:'#22c55e'},
                {x:15, y:156, w:120, h:40, f:'#16a34a'}, {x:140, y:156, w:120, h:40, f:'#22c55e'}, {x:265, y:156, w:120, h:40, f:'#15803d'}
              ].map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="3" fill={r.f} opacity=".85" />)}

              <rect x="195" y="15" width="130" height="87" rx="4" fill="url(#stress1)"/>
              <rect x="15" y="62" width="70" height="134" rx="4" fill="url(#stress2)"/>

              <text x="255" y="38" className="ndvi-field-label" fill="#fca5a5" fontSize="10">⚠ STRESS</text>
              <text x="18" y="130" className="ndvi-field-label" fill="#fde68a" fontSize="10">⚠ DRY</text>
              <text x="140" y="85" className="ndvi-field-label" fill="#86efac" fontSize="11">✓ HEALTHY</text>
            </svg>
            <div className="ndvi-score">NDVI: 0.78 · 2.4 Ha</div>
            <div className="stress-alert">⚠ Stress zone detected in NE corner — 0.4 Ha. Possible water deficit. Check irrigation.</div>
          </div>
          <div style={{marginTop:'10px'}}>
            <div className="ct" style={{marginBottom:'6px'}}>Vegetation Index Legend</div>
            <div className="ndvi-legend">
              {['#dc2626', '#ef4444', '#f59e0b', '#ca8a04', '#84cc16', '#22c55e', '#16a34a', '#14532d'].map((c, i) => (
                <div key={i} className="ndvi-leg-seg" style={{background: c}}></div>
              ))}
            </div>
            <div className="ndvi-leg-labels"><span>0.0 (Bare soil)</span><span>0.3</span><span>0.5</span><span>0.8</span><span>1.0 (Dense)</span></div>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <div className="f-card">
            <div className="ct">All Fields NDVI</div>
            <div className="hbar"><div className="hbar-n">North Field<span className="hbar-sub">Wheat · A1</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'78%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>0.78</div></div>
            <div className="hbar"><div className="hbar-n">South Orchard<span className="hbar-sub">Mustard · B2</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'68%', background:'#ca8a04'}}></div></div><div className="hbar-v" style={{color:'#ca8a04'}}>0.68</div></div>
            <div className="hbar"><div className="hbar-n">Canal Side<span className="hbar-sub">Millet · C1</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'85%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>0.85</div></div>
            <div className="hbar"><div className="hbar-n">Cotton Plot<span className="hbar-sub">Cotton · D</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'42%', background:'#dc2626'}}></div></div><div className="hbar-v" style={{color:'#dc2626'}}>0.42</div></div>
          </div>
          <div className="f-card">
            <div className="ct">Satellite Advisory</div>
            <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
              <div style={{background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:'9px', padding:'9px 11px'}}><div style={{fontSize:'11px', fontWeight:'700', color:'#991b1b'}}>🔴 Cotton Plot · NDVI 0.42</div><div style={{fontSize:'10px', color:'#b91c1c', marginTop:'3px'}}>Severe stress. Possible pest damage or drought. Immediate inspection needed.</div></div>
              <div style={{background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'9px', padding:'9px 11px'}}><div style={{fontSize:'11px', fontWeight:'700', color:'#92400e'}}>🟡 South Orchard · NDVI 0.68</div><div style={{fontSize:'10px', color:'#b45309', marginTop:'3px'}}>Moderate. Consider irrigation boost and zinc application.</div></div>
              <div style={{background:'#f0fdf4', border:'1px solid #86efac', borderRadius:'9px', padding:'9px 11px'}}><div style={{fontSize:'11px', fontWeight:'700', color:'#166534'}}>🟢 Canal Side · NDVI 0.85</div><div style={{fontSize:'10px', color:'#15803d', marginTop:'3px'}}>Excellent vegetation density. No action needed.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDVISatellite;
