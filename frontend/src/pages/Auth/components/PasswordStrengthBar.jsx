import React from 'react';

const PasswordStrengthBar = ({ password }) => {
  const getStrength = (pw) => {
    let score = 0;
    if (!pw) return { level: '', color: '#eee', width: '0%', text: 'Enter a password' };
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const levels = [
      { text: 'Weak — add numbers or symbols', color: '#e53935', width: '25%' },
      { text: 'Fair — add uppercase letters', color: '#ffa726', width: '50%' },
      { text: 'Good — add a special character', color: '#42a5f5', width: '75%' },
      { text: 'Strong password', color: '#43a047', width: '100%' }
    ];
    
    return { ...levels[Math.max(0, score - 1)], level: score };
  };

  const strength = getStrength(password);

  return (
    <div style={{ marginTop: '8px' }}>
      <div className="str-bar">
        <div 
          className="str-fill" 
          style={{ width: strength.width, background: strength.color }}
        ></div>
      </div>
      <div style={{ fontSize: '11px', marginTop: '4px', color: strength.color }}>
        {strength.text}
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
