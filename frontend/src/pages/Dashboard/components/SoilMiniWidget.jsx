import React from 'react';

const SoilMiniWidget = () => {
  const params = [
    { label: 'Nitrogen', val: 'Low', color: 'var(--red)', w: '42%' },
    { label: 'Phosphorus', val: 'Med', color: 'var(--amber)', w: '70%' },
    { label: 'Potassium', val: 'High', color: 'var(--g3)', w: '88%' },
    { label: 'pH Level', val: '6.8', color: 'var(--blue)', w: '62%' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span>🧪 Soil Health Card</span>
        <span className="badge b-amber">JAN 2025</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {params.map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>{p.label}</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: p.color }}>{p.val}</div>
            </div>
            <div className="hbar-track" style={{ height: '5px' }}>
              <div className="hbar-fill" style={{ width: p.w, background: p.color, height: '100%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoilMiniWidget;
