import React from 'react';

const SchemeCard = ({ 
  title, 
  amount, 
  subText, 
  progress, 
  progressLabel, 
  bgColor, 
  accentColor,
  url = 'pmkisan.gov.in' 
}) => {
  return (
    <div className={`p-5 rounded-2xl shadow-sm text-white relative overflow-hidden`} style={{ background: bgColor }}>
      {/* Decorative pulse dot */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }}></div>
      
      <div className="mb-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.9px] mb-1.5" style={{ color: accentColor }}>
          {title}
        </h4>
        <p className="text-[21px] font-black leading-tight">{amount}</p>
        <p className="text-[11px] opacity-80 font-medium mt-1">{subText}</p>
      </div>

      <div>
        <div className="w-full bg-white/20 h-[5px] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%`, background: accentColor }}
          />
        </div>
        <div className="flex justify-between items-center mt-2.5">
          <span className="text-[10px] opacity-70 font-bold uppercase tracking-tight">
            {progressLabel}
          </span>
          <span className="text-[9px] opacity-50 font-medium">{url}</span>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
