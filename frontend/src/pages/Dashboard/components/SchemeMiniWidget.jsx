import React from 'react';
import SchemeCard from './SchemeCard';

const SchemeMiniWidget = ({ pmfbyData = {} }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* PM-KISAN - Standard for all */}
      <SchemeCard 
        title="PM-KISAN Samman Nidhi"
        amount="₹6,000 / year"
        subText="Next installment: ₹2,000 in 18 days"
        progress={66}
        progressLabel="2 of 3 installments received"
        bgColor="#14301f"
        accentColor="#5ee08a"
        url="pmkisan.gov.in"
      />

      {/* PMFBY - State specific */}
      <SchemeCard 
        title="PMFBY Crop Insurance"
        amount={pmfbyData.pa || '₹1.5% Premium'}
        subText={pmfbyData.ps || 'Kharif 2024 — active'}
        progress={pmfbyData.pp || 0}
        progressLabel={pmfbyData.pl || 'pmfby.gov.in'}
        bgColor="#0d2b4a"
        accentColor="#60aff5"
        url="pmfby.gov.in"
      />
    </div>
  );
};

export default SchemeMiniWidget;
