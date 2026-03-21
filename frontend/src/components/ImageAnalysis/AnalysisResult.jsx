import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  Download,
  Share2,
  BookOpen,
  Droplets,
  Thermometer,
  Wind
} from 'lucide-react';

const AnalysisResult = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="no-results">
        <div className="no-results-icon">
          <BookOpen size={48} />
        </div>
        <h3>No Analysis Results</h3>
        <p>Upload a plant image to get disease analysis and recommendations.</p>
      </div>
    );
  }

  const {
    disease,
    confidence,
    severity,
    recommendations,
    environmentalFactors,
    timeline,
    similarCases
  } = analysisData;

  const getSeverityColor = (level) => {
    switch(level.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (percent) => {
    if (percent >= 90) return 'text-green-600';
    if (percent >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="analysis-result-container">
      {/* Result Header */}
      <div className="result-header">
        <div className="header-main">
          <div className="disease-icon">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2>{disease.name}</h2>
            <p className="disease-description">{disease.description}</p>
          </div>
        </div>
        
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-label">Confidence</span>
            <span className={`stat-value ${getConfidenceColor(confidence)}`}>
              {confidence}%
            </span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Severity</span>
            <span className={`stat-value ${getSeverityColor(severity)}`}>
              {severity}
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h3>
          <CheckCircle size={20} />
          Recommended Actions
        </h3>
        <div className="recommendations-grid">
          {recommendations.immediate.map((action, index) => (
            <div key={index} className="recommendation-card urgent">
              <div className="card-header">
                <AlertTriangle size={16} />
                <span>Immediate Action</span>
              </div>
              <p>{action}</p>
            </div>
          ))}
          
          {recommendations.longTerm.map((action, index) => (
            <div key={index} className="recommendation-card">
              <div className="card-header">
                <TrendingUp size={16} />
                <span>Long-term Solution</span>
              </div>
              <p>{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Factors */}
      <div className="environment-section">
        <h3>
          <Thermometer size={20} />
          Environmental Factors
        </h3>
        <div className="environment-grid">
          <div className="factor-card">
            <div className="factor-icon">
              <Thermometer size={24} />
            </div>
            <div>
              <h4>Temperature</h4>
              <p>{environmentalFactors.temperature.condition}</p>
              <span className="factor-value">
                {environmentalFactors.temperature.value}
              </span>
            </div>
          </div>
          
          <div className="factor-card">
            <div className="factor-icon">
              <Droplets size={24} />
            </div>
            <div>
              <h4>Humidity</h4>
              <p>{environmentalFactors.humidity.condition}</p>
              <span className="factor-value">
                {environmentalFactors.humidity.value}
              </span>
            </div>
          </div>
          
          <div className="factor-card">
            <div className="factor-icon">
              <Wind size={24} />
            </div>
            <div>
              <h4>Air Flow</h4>
              <p>{environmentalFactors.airFlow.condition}</p>
              <span className="factor-value">
                {environmentalFactors.airFlow.value}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Timeline */}
      <div className="timeline-section">
        <h3>
          <Clock size={20} />
          Treatment Timeline
        </h3>
        <div className="timeline">
          {timeline.map((stage, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className={`marker ${stage.status}`}></div>
              </div>
              <div className="timeline-content">
                <h4>{stage.title}</h4>
                <p>{stage.description}</p>
                <span className="timeline-duration">{stage.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Cases */}
      {similarCases && similarCases.length > 0 && (
        <div className="similar-cases">
          <h3>Similar Cases & Solutions</h3>
          <div className="cases-grid">
            {similarCases.map((caseItem, index) => (
              <div key={index} className="case-card">
                <div className="case-header">
                  <span className="case-severity">
                    {caseItem.severity}
                  </span>
                  <span className="case-success">
                    {caseItem.successRate}% success
                  </span>
                </div>
                <p className="case-description">{caseItem.description}</p>
                <div className="case-tags">
                  {caseItem.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="case-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn primary">
          <Download size={18} />
          Download Report
        </button>
        <button className="action-btn secondary">
          <Share2 size={18} />
          Share Results
        </button>
        <button className="action-btn outline">
          <BookOpen size={18} />
          View Detailed Guide
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;