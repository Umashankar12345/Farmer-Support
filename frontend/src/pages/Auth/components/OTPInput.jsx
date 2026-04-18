import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ onComplete, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next
    if (element.value !== '' && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(v => v !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').slice(0, 6).split('');
    if (data.length === 6 && data.every(v => !isNaN(v))) {
      setOtp(data);
      onComplete(data.join(''));
    }
  };

  return (
    <div className="otp-row" onPaste={handlePaste}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="tel"
          className={`otp-box ${data ? 'filled' : ''} ${error ? 'animate-shake border-red-500' : ''}`}
          maxLength="1"
          value={data}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          ref={el => inputs.current[index] = el}
        />
      ))}
    </div>
  );
};

export default OTPInput;
