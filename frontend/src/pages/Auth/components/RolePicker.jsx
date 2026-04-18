import React from 'react';

const RolePicker = ({ value, onChange }) => {
  const roles = [
    { id: 'Farmer', icon: '👨‍🌾', label: 'Farmer' },
    { id: 'Dealer', icon: '🏪', label: 'Dealer' },
    { id: 'Officer', icon: '🏢', label: 'Officer' }
  ];

  return (
    <div className="role-grid">
      {roles.map(role => (
        <div 
          key={role.id}
          className={`role-pill ${value === role.id ? 'selected' : ''}`}
          onClick={() => onChange(role.id)}
        >
          <span style={{ fontSize: '20px', display: 'block' }}>{role.icon}</span>
          <span style={{ fontSize: '11px', fontWeight: '600' }}>{role.label}</span>
        </div>
      ))}
    </div>
  );
};

export default RolePicker;
