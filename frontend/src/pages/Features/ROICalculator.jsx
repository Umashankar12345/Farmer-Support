import React, { useState } from 'react';
import './Features.css';

const ROICalculator = () => {
  const [data, setData] = useState({
    revenue: '₹12.5L',
    cost: '₹4.2L',
    profit: '₹8.3L',
    revChange: '+14.2%',
    costChange: '+3.1%'
  });

  const recalc = () => {
    const revs = ['₹11.8L', '₹12.5L', '₹13.2L'];
    const costs = ['₹3.9L', '₹4.2L', '₹4.5L'];
    const profits = ['₹7.9L', '₹8.3L', '₹8.7L'];
    const r = Math.floor(Math.random() * 3);
    setData({
      ...data,
      revenue: revs[r],
      cost: costs[r],
      profit: profits[r]
    });
  };

  return (
    <div className="features-root f-page">
      <div className="page-hdr">
        <div>
          <div className="page-title">📊 Income & ROI Calculator</div>
          <div className="page-sub">Real financial breakdown — cost of inputs, net profit, break-even point</div>
        </div>
        <button className="f-btn f-btn-g f-btn-sm" onClick={recalc}>↻ Recalculate</button>
      </div>

      <div className="roi-grid">
        <div className="roi-card"><div className="roi-val" style={{color:'var(--g1)'}}>{data.revenue}</div><div className="roi-lbl">Total Revenue</div><div className="roi-change" style={{color:'#16a34a'}}>▲ {data.revChange} vs last yr</div></div>
        <div className="roi-card"><div className="roi-val" style={{color:'var(--red)'}}>{data.cost}</div><div className="roi-lbl">Total Input Cost</div><div className="roi-change" style={{color:'#dc2626'}}>▲ {data.costChange} inflation</div></div>
        <div className="roi-card"><div className="roi-val" style={{color:'var(--g2)'}}>{data.profit}</div><div className="roi-lbl">Net Profit</div><div className="roi-change" style={{color:'#16a34a'}}>ROI: 197%</div></div>
      </div>

      <div className="g21">
        <div className="f-card">
          <div className="ct">Profit & Loss Breakdown <span className="f-badge bg">Per Crop</span></div>
          <div className="roi-breakdown">
            <div className="roi-row income"><div className="roi-row-lbl">🌻 Mustard Revenue (4.2 Ha)</div><div className="roi-row-val">+₹5,80,000</div></div>
            <div className="roi-row income"><div className="roi-row-lbl">🌾 Wheat Revenue (2.8 Ha)</div><div className="roi-row-val">+₹4,20,000</div></div>
            <div className="roi-row income"><div className="roi-row-lbl">🌿 Millet Revenue (1.5 Ha)</div><div className="roi-row-val">+₹2,50,000</div></div>
            <div style={{height:'1px', background:'var(--border)', margin:'6px 0'}}></div>
            <div className="roi-row cost"><div className="roi-row-lbl">🌱 Seeds & Sowing</div><div className="roi-row-val">−₹65,000</div></div>
            <div className="roi-row cost"><div className="roi-row-lbl">🧪 Fertilizer & Pesticide</div><div className="roi-row-val">−₹1,10,000</div></div>
            <div className="roi-row cost"><div className="roi-row-lbl">👷 Labour (Seasonal)</div><div className="roi-row-val">−₹1,80,000</div></div>
            <div className="roi-row cost"><div className="roi-row-lbl">🚜 Equipment & Fuel</div><div className="roi-row-val">−₹65,000</div></div>
            <div className="roi-row cost"><div className="roi-row-lbl">💧 Irrigation Cost</div><div className="roi-row-val">−₹80,000</div></div>
            <div style={{height:'1px', background:'var(--border)', margin:'6px 0'}}></div>
            <div className="roi-row profit"><div className="roi-row-lbl">💰 NET PROFIT (After all costs)</div><div className="roi-row-val">{data.profit}</div></div>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <div className="f-card">
            <div className="ct">Break-Even Analysis</div>
            <div style={{textAlign:'center', padding:'10px 0'}}>
              <div style={{fontSize:'28px', fontWeight:'800', color:'var(--g1)'}}>₹1,42,000</div>
              <div style={{fontSize:'11px', color:'var(--muted)', marginTop:'3px'}}>Monthly break-even point</div>
              <div style={{background:'var(--g5)', borderRadius:'10px', padding:'10px', marginTop:'10px', fontSize:'11px', color:'var(--muted)', textAlign:'left'}}>
                <div style={{marginBottom:'4px'}}>📅 <strong>Months to break-even: 3.2</strong></div>
                <div>Based on current input costs and market prices, you cover all costs by March 2025.</div>
              </div>
            </div>
          </div>
          <div className="f-card">
            <div className="ct">Year-on-Year Comparison</div>
            <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 10px', background:'var(--g5)', borderRadius:'8px'}}><div style={{fontSize:'11px', fontWeight:'600'}}>2023 Net Profit</div><div style={{fontSize:'13px', fontWeight:'800', color:'var(--muted)'}}>₹5.8L</div></div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 10px', background:'var(--g5)', borderRadius:'8px'}}><div style={{fontSize:'11px', fontWeight:'600'}}>2024 Net Profit</div><div style={{fontSize:'13px', fontWeight:'800', color:'var(--amber)'}}>₹7.1L</div></div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 10px', background:'#dcfce7', borderRadius:'8px', border:'1px solid #86efac'}}><div style={{fontSize:'11px', fontWeight:'700', color:'var(--g1)'}}>2025 Net Profit</div><div style={{fontSize:'14px', fontWeight:'800', color:'var(--g1)'}}>₹8.5L ▲</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
