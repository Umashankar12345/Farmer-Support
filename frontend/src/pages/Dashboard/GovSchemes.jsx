import React from 'react';

const GovSchemes = ({ schemes }) => {
  const schemeList = schemes || [
    {
      id: 1,
      name: "PM-KISAN Scheme",
      description: "Financial support for farmers.",
      link: "#"
    },
    {
      id: 2,
      name: "PM Krishi Sinchai Yojana",
      description: "\"Per drop, more crop.\"",
      link: "#"
    },
    {
      id: 3,
      name: "Soil Health Card",
      description: "Know your soil's health.",
      link: "#"
    }
  ];

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Relevant Government Schemes</h3>
      </div>
      <div className="schemes-list">
        {schemeList.map((scheme) => (
          <div key={scheme.id} className="scheme-card">
            <div className="scheme-info">
              <h4 className="scheme-name">{scheme.name}</h4>
              <p className="scheme-description">{scheme.description}</p>
            </div>
            <button className="scheme-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovSchemes;