import React from 'react';

const StepProgress = ({ currentStep, totalSteps, labels }) => {
  return (
    <div className="steps-wrap">
      <div className="steps-bar">
        {[...Array(totalSteps)].map((_, i) => (
          <div 
            key={i} 
            className={`s-dot ${i + 1 === currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'done' : ''}`}
          ></div>
        ))}
      </div>
      <div className="step-label">
        {labels[currentStep - 1] || `Step ${currentStep} of ${totalSteps}`}
      </div>
    </div>
  );
};

export default StepProgress;
