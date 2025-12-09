import React from 'react';

const PestAdvisory = ({ pestData }) => {
  const data = pestData || {
    crop: "Paddy",
    pest: "Brown Plant Hopper",
    alert: "High Alert",
    description: "High humidity and dense planting can lead to outbreaks. Look for yellowing patches.",
    recommendation: "Use appropriate pesticides and maintain proper spacing."
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Post & Disease Advisory</h3>
      </div>
      <div className="pest-content">
        <div className="pest-title">
          <span className="pest-crop">{data.crop}:</span>
          <span className="pest-name">{data.pest}</span>
        </div>
        <p className="pest-description">{data.description}</p>
        <div className="pest-alert">
          <span className="alert-badge">{data.alert}</span>
        </div>
        <div className="pest-actions">
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default PestAdvisory;