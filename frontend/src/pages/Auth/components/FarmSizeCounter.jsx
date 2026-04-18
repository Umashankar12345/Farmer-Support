import React from 'react';

const FarmSizeCounter = ({ value, onChange }) => {
  const handleIncrement = () => onChange(Math.min(9999, (parseInt(value) || 0) + 1));
  const handleDecrement = () => onChange(Math.max(0, (parseInt(value) || 0) - 1));

  return (
    <div className="counter-wrap" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      border: '1.5px solid #eee', 
      borderRadius: '12px', 
      overflow: 'hidden',
      background: '#fdfdfd'
    }}>
      <button 
        type="button"
        onClick={handleDecrement}
        style={{ width: '44px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: '#2e7d32' }}
      >minus</button>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        style={{ flex: 1, border: 'none', textAlign: 'center', fontSize: '16px', fontWeight: '700', outline: 'none', background: 'transparent' }}
      />
      <span style={{ fontSize: '12px', color: '#888', paddingRight: '8px' }}>acres</span>
      <button 
        type="button"
        onClick={handleIncrement}
        style={{ width: '44px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: '#2e7d32' }}
      >plus</button>
    </div>
  );
};

export default FarmSizeCounter;
