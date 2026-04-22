import React, { useState } from 'react';
import './Features.css';

const CROP_DB = {
  'Rajasthan': {
    'Rabi (Oct–Mar)': {
      top: 'Mustard (Pusa)', score: '94.2%', yield: '12–15 Qtl/acre', price: '₹5,280/Qtl',
      reasons: [
        'Soil pH 6.8 ideal for Mustard (optimal 6–7.5)',
        'Rajasthan rainfall 580mm matches Mustard water need',
        'Live mandi ₹5,280/Qtl — up 2.4% this week',
        'Also consider: Wheat (Raj-3077) or Chickpea'
      ],
      tags: ['✓ pH Compatible', '✓ Low Water', '✓ High Market', '↑ +2.4% Trend']
    },
    'Kharif (Jun–Sep)': {
      top: 'Millet (Bajra)', score: '91.8%', yield: '8–12 Qtl/acre', price: '₹1,890/Qtl',
      reasons: [
        'Millet is drought-resistant — perfect for Rajasthan',
        'Low water requirement — ideal for borewell irrigation',
        'High nutritional value — good market demand',
        'Also consider: Cluster Bean or Moth Bean'
      ],
      tags: ['✓ Drought Resistant', '✓ Low Water', '✓ Sandy Soil Match']
    }
  },
  'Punjab': {
    'Rabi (Oct–Mar)': {
      top: 'Wheat (HD-2967)', score: '96.1%', yield: '18–22 Qtl/acre', price: '₹2,150/Qtl',
      reasons: [
        'Punjab alluvial soil is ideal for wheat',
        'High productivity zone — HD-2967 rust resistant',
        'Minimum Support Price secured at ₹2,275/Qtl',
        'Also consider: Barley or Mustard'
      ],
      tags: ['✓ Alluvial Match', '✓ MSP Secured', '✓ High Yield']
    }
  }
};

const CropRecommender = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    state: 'Rajasthan',
    soil: 'Sandy Loam',
    season: 'Rabi (Oct–Mar)',
    ph: '6.8',
    rain: '580',
    area: '5'
  });

  const runAnalysis = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const data = (CROP_DB[formData.state] && CROP_DB[formData.state][formData.season]) || CROP_DB['Rajasthan']['Rabi (Oct–Mar)'];
      setResult(data);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">🌱 AI Crop Recommendation Engine</div>
          <div className="page-sub">Combines soil data + weather forecast + live mandi prices → best crop decision</div>
        </div>
      </div>

      <div className="rec-form">
        <div className="rec-form-title">Enter Your Farm Parameters</div>
        <div className="rec-form-sub">AI analyzes 12 factors across soil, climate and market to recommend the optimal crop</div>
        <div className="rec-fields">
          <div className="rec-field">
            <label>State</label>
            <select className="rec-inp" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
              <option>Rajasthan</option><option>Punjab</option><option>Haryana</option><option>UP</option><option>MP</option><option>Maharashtra</option><option>Gujarat</option>
            </select>
          </div>
          <div className="rec-field">
            <label>Soil Type</label>
            <select className="rec-inp" value={formData.soil} onChange={e => setFormData({...formData, soil: e.target.value})}>
              <option>Sandy Loam</option><option>Alluvial</option><option>Black (Regur)</option><option>Red Laterite</option><option>Loamy</option>
            </select>
          </div>
          <div className="rec-field">
            <label>Season</label>
            <select className="rec-inp" value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})}>
              <option>Rabi (Oct–Mar)</option><option>Kharif (Jun–Sep)</option><option>Zaid (Mar–Jun)</option>
            </select>
          </div>
          <div className="rec-field">
            <label>Soil pH</label>
            <input className="rec-inp" type="number" value={formData.ph} onChange={e => setFormData({...formData, ph: e.target.value})} step="0.1" />
          </div>
          <div className="rec-field">
            <label>Rainfall (mm/yr)</label>
            <input className="rec-inp" type="number" value={formData.rain} onChange={e => setFormData({...formData, rain: e.target.value})} />
          </div>
          <div className="rec-field">
            <label>Farm Size (acres)</label>
            <input className="rec-inp" type="number" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
          </div>
        </div>
        
        <button className="f-btn f-btn-dark" style={{background:'rgba(255,255,255,.15)', color:'#fff', border:'1px solid rgba(255,255,255,.25)'}} onClick={runAnalysis} disabled={loading}>
          {loading ? <span className="spin"></span> : '🔍 Analyze & Recommend →'}
        </button>

        {result && (
          <div className={`rec-result ${result ? 'show' : ''}`}>
            <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'10px'}}>
              <div>
                <div style={{fontSize:'11px', opacity:'.65', textTransform:'uppercase', letterSpacing:'.5px', fontWeight:'700'}}>TOP RECOMMENDATION</div>
                <div className="rec-crop-name">{result.top}</div>
                <div className="rec-score">Confidence Score: {result.score} · Season: {formData.season.split(' ')[0]} · ROI: High</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'11px', opacity:'.65'}}>Est. Yield</div>
                <div style={{fontSize:'22px', fontWeight:'800', color:'#86efac'}}>{result.yield}</div>
                <div style={{fontSize:'11px', opacity:'.65', marginTop:'2px'}}>Current Price</div>
                <div style={{fontSize:'16px', fontWeight:'700', color:'#fde68a'}}>{result.price}</div>
              </div>
            </div>
            <div className="rec-tags">
              {result.tags.map((tag, i) => <div key={i} className="rec-tag">{tag}</div>)}
            </div>
            <div className="rec-reasons">
              {result.reasons.map((reason, i) => (
                <div key={i} className="rec-reason">
                  <div className="rec-r-dot" style={{background: i === result.reasons.length - 1 ? '#f59e0b' : '#22c55e'}}></div>
                  {reason}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid3">
        <div className="f-card">
          <div className="ct">Top 3 Alternatives <span className="f-badge bg">This Season</span></div>
          <div className="hbar"><div className="hbar-n">Mustard (Pusa)<span className="hbar-sub">Recommended #1</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'94%', background:'#16a34a'}}></div></div><div className="hbar-v" style={{color:'#16a34a'}}>94%</div></div>
          <div className="hbar"><div className="hbar-n">Wheat (Raj-3077)<span className="hbar-sub">Alternative #2</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'78%', background:'#ca8a04'}}></div></div><div className="hbar-v" style={{color:'#ca8a04'}}>78%</div></div>
          <div className="hbar"><div className="hbar-n">Chickpea<span className="hbar-sub">Alternative #3</span></div><div className="hbar-t"><div className="hbar-f" style={{width:'65%', background:'#0891b2'}}></div></div><div className="hbar-v" style={{color:'#0891b2'}}>65%</div></div>
        </div>
        <div className="f-card">
          <div className="ct">Soil vs Crop Matrix</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px', marginTop:'4px'}}>
             {[
               {icon: '🌻', name: 'Mustard', ph: '6–7.5', status: '✓ Match', type: 'bg'},
               {icon: '🌾', name: 'Wheat', ph: '6–7.5', status: '✓ Match', type: 'bg'},
               {icon: '🌿', name: 'Cotton', ph: '5.5–7', status: '⚠ Check', type: 'ba'},
               {icon: '🫘', name: 'Soybean', ph: '6–7', status: '✓ Match', type: 'bg'},
               {icon: '🌶', name: 'Chilli', ph: '6–7', status: '✗ Low fit', type: 'br'},
               {icon: '🧅', name: 'Onion', ph: '6–7', status: '✓ Match', type: 'bg'}
             ].map((item, i) => (
               <div key={i} style={{background:'var(--g5)', borderRadius:'9px', padding:'8px', textAlign:'center'}}>
                 <div style={{fontSize:'16px'}}>{item.icon}</div>
                 <div style={{fontSize:'10px', fontWeight:'700', color:'var(--g1)', marginTop:'3px'}}>{item.name}</div>
                 <div style={{fontSize:'9px', color:'var(--muted)'}}>pH {item.ph}</div>
                 <div className={`f-badge ${item.type}`} style={{marginTop:'4px', display:'block', textAlign:'center'}}>{item.status}</div>
               </div>
             ))}
          </div>
        </div>
        <div className="f-card">
          <div className="ct">Sowing Calendar</div>
          <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
            <div style={{background:'var(--g5)', borderRadius:'9px', padding:'9px 11px', borderLeft:'3px solid var(--g3)'}}><div style={{display:'flex', justifyContent:'space-between'}}><div style={{fontSize:'12px', fontWeight:'700'}}>Mustard</div><span className="f-badge bg">Best now</span></div><div style={{fontSize:'10px', color:'var(--muted)', marginTop:'3px'}}>Sow: Oct 5–Nov 15 · Harvest: Feb–Mar</div></div>
            <div style={{background:'var(--g5)', borderRadius:'9px', padding:'9px 11px', borderLeft:'3px solid #ca8a04'}}><div style={{display:'flex', justifyContent:'space-between'}}><div style={{fontSize:'12px', fontWeight:'700'}}>Wheat</div><span className="f-badge ba">Good</span></div><div style={{fontSize:'10px', color:'var(--muted)', marginTop:'3px'}}>Sow: Nov 1–Dec 15 · Harvest: Apr</div></div>
            <div style={{background:'#fafafa', borderRadius:'9px', padding:'9px 11px', borderLeft:'3px solid #94a3b8'}}><div style={{display:'flex', justifyContent:'space-between'}}><div style={{fontSize:'12px', fontWeight:'700'}}>Chickpea</div><span className="f-badge bb">Possible</span></div><div style={{fontSize:'10px', color:'var(--muted)', marginTop:'3px'}}>Sow: Oct 15–Nov 30 · Harvest: Mar</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommender;
