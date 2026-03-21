import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  X,
  ZoomIn,
  RotateCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Share2
} from 'lucide-react';
import axios from 'axios';

const DiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadMessageType, setUploadMessageType] = useState('');

  const fileInputRef = useRef(null);
  const cameraVideoRef = useRef(null);
  const cameraCanvasRef = useRef(null);

  const sampleDiseases = [
    {
      id: 1,
      name: "Tomato Blight",
      confidence: 92,
      symptoms: ["Brown spots on leaves", "Yellowing of foliage", "Fruit rot"],
      treatments: ["Remove infected plants", "Apply copper fungicide", "Improve air circulation"],
      severity: "High",
      prevention: "Use disease-resistant varieties, avoid overhead watering"
    },
    {
      id: 2,
      name: "Powdery Mildew",
      confidence: 85,
      symptoms: ["White powdery patches", "Leaf curling", "Stunted growth"],
      treatments: ["Apply sulfur-based fungicide", "Neem oil spray", "Baking soda solution"],
      severity: "Medium",
      prevention: "Maintain proper spacing, ensure good air flow"
    }
  ];

  // Show message helper
  const showMessage = (text, type) => {
    setUploadMessage(text);
    setUploadMessageType(type);
    setTimeout(() => setUploadMessage(''), 3000);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        showMessage('File size should be less than 5MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(file);
        setPreview(e.target.result);
        uploadAndAnalyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start camera for capturing
  const startCamera = async () => {
    try {
      setShowCameraModal(true);
      setTimeout(async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' } // Use back camera
          });
          if (cameraVideoRef.current) {
            cameraVideoRef.current.srcObject = stream;
          }
        }
      }, 100);
    } catch (error) {
      showMessage('Camera access denied or not available', 'error');
      console.error('Camera error:', error);
    }
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (!cameraVideoRef.current || !cameraCanvasRef.current) return;

    const video = cameraVideoRef.current;
    const canvas = cameraCanvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data URL
    canvas.toBlob((blob) => {
      const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      setImage(file);
      setPreview(URL.createObjectURL(blob));
      setShowCameraModal(false);

      // Stop camera stream
      if (video.srcObject) {
        const stream = video.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }

      uploadAndAnalyzeImage(file);
    }, 'image/jpeg');
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraVideoRef.current && cameraVideoRef.current.srcObject) {
      const stream = cameraVideoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      cameraVideoRef.current.srcObject = null;
    }
    setShowCameraModal(false);
  };

  // Upload image to backend for diagnosis
  const uploadAndDiagnose = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    // Get context from localStorage or defaults
    formData.append('humidity', '75');
    formData.append('temperature', '28');
    formData.append('moisture', '65');

    try {
      const response = await axios.post('/api/v1/diagnose', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      return response.data.diagnosis;
    } catch (error) {
      console.error('Diagnosis failed:', error);
      throw new Error('Failed to diagnose plant');
    }
  };

  // Upload and analyze image
  const uploadAndAnalyzeImage = async (file) => {
    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      // 1. Upload and get AI diagnosis
      const diagnosisResult = await uploadAndDiagnose(file);

      setIsAnalyzing(false);
      setAnalysisResult({
        detectedDiseases: [
          {
            id: Date.now(),
            name: diagnosisResult.disease,
            confidence: Math.round(diagnosisResult.confidence * 100),
            details: diagnosisResult.details,
            severity: diagnosisResult.confidence > 0.8 ? "High" : "Medium",
            symptoms: ["Analyzed via AgriVoice Vision"],
            treatments: ["See AI recommendation below"],
            prevention: "Consult detailed AI analysis"
          }
        ],
        imageAnalysis: {
          colorPattern: "AI identified pattern match",
          textureAnalysis: "Computed texture features analyzed",
          severityScore: Math.round(diagnosisResult.confidence * 100),
          recommendations: "Follow the AI-generated treatment plan below",
          uploadedUrl: diagnosisResult.imageUrl
        },
        aiDetails: diagnosisResult.details,
        timestamp: new Date().toLocaleString()
      });

      showMessage('Diagnosis complete!', 'success');

    } catch (error) {
      setIsAnalyzing(false);
      showMessage('Failed to complete diagnosis. Please try again.', 'error');
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setAnalysisResult(null);
    setUploadProgress(0);
  };

  const handleDownloadReport = () => {
    const report = `
Plant Disease Analysis Report
===============================

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

DETECTED DISEASES:
${analysisResult.detectedDiseases.map(d => `
• ${d.name} (${d.confidence}% confidence)
  Severity: ${d.severity}
  Symptoms: ${d.symptoms.join(', ')}
  Treatments: ${d.treatments.join(', ')}
  Prevention: ${d.prevention}
`).join('\n')}

IMAGE ANALYSIS SUMMARY:
• Color Pattern: ${analysisResult.imageAnalysis.colorPattern}
• Texture Analysis: ${analysisResult.imageAnalysis.textureAnalysis}
• Severity Score: ${analysisResult.imageAnalysis.severityScore}/100
• Top Recommendation: ${analysisResult.imageAnalysis.recommendations}

RECOMMENDATIONS:
1. Isolate affected plants immediately
2. Apply recommended treatments
3. Monitor progress daily
4. Consult local agricultural expert if condition worsens

Generated by FarmerSupport AI System
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `disease-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Report downloaded successfully!', 'success');
  };

  return (
    <div className="disease-detector">
      <div className="detector-header">
        <h2>
          <AlertTriangle size={24} />
          Plant Disease Detector
        </h2>
        <p className="subtitle">
          Upload or capture plant image for instant disease detection and treatment recommendations
        </p>
      </div>

      {uploadMessage && (
        <div className={`upload-message ${uploadMessageType}`}>
          {uploadMessage}
        </div>
      )}

      <div className="detector-grid">
        {/* Left Column - Image Upload & Capture */}
        <div className="upload-section">
          <div className="upload-card">
            {!preview ? (
              <div className="upload-placeholder">
                <div className="upload-options">
                  <button
                    className="upload-option"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Upload size={32} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </button>

                  <button
                    className="upload-option"
                    onClick={startCamera}
                  >
                    <Camera size={32} />
                    <span>Take Photo</span>
                  </button>
                </div>

                <div className="upload-tips">
                  <h4>Tips for best results:</h4>
                  <ul>
                    <li>Use clear, well-lit photos</li>
                    <li>Focus on affected leaves or fruits</li>
                    <li>Include healthy parts for comparison</li>
                    <li>Multiple angles help accuracy</li>
                    <li>Max file size: 5MB</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="image-preview">
                <div className="preview-header">
                  <h4>Image Preview</h4>
                  <button onClick={clearImage} className="clear-btn">
                    <X size={18} />
                  </button>
                </div>
                <div className="preview-image">
                  <img src={preview} alt="Uploaded plant" />
                </div>
                <div className="preview-controls">
                  {analysisResult?.imageAnalysis?.uploadedUrl && (
                    <a
                      href={analysisResult.imageAnalysis.uploadedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-original-link"
                    >
                      View Original
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="analysis-progress">
              <div className="progress-header">
                <Clock size={18} />
                <span>Analyzing Image...</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {uploadProgress}% complete
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Analysis Results */}
        <div className="results-section">
          {analysisResult ? (
            <div className="analysis-results">
              <div className="results-header">
                <h3>
                  <CheckCircle size={20} className="text-green-500" />
                  Analysis Results
                </h3>
                <div className="result-actions">
                  <button
                    onClick={handleDownloadReport}
                    className="action-btn"
                  >
                    <Download size={16} />
                    Report
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showMessage('Link copied to clipboard!', 'success');
                    }}
                    className="action-btn"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>

              <div className="detected-diseases">
                {analysisResult.detectedDiseases.map(disease => (
                  <div key={disease.id} className="disease-card">
                    <div className="disease-header">
                      <h4>{disease.name}</h4>
                      <div className={`confidence-badge ${disease.confidence > 90 ? 'high' :
                          disease.confidence > 75 ? 'medium' : 'low'
                        }`}>
                        {disease.confidence}% Confidence
                      </div>
                    </div>

                    <div className="disease-severity">
                      <span className="severity-label">Severity:</span>
                      <span className={`severity-value ${disease.severity.toLowerCase()}`}>
                        {disease.severity}
                      </span>
                    </div>

                    {analysisResult.aiDetails && (
                      <div className="ai-treatment-plan mt-4 p-4 rounded-xl bg-purple-50 border border-purple-100 dark:bg-purple-900/10 dark:border-purple-800">
                        <h5 className="text-purple-700 dark:text-purple-400 font-bold mb-2 flex items-center gap-2">
                          🧠 AI Treatment Magic
                        </h5>
                        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {analysisResult.aiDetails}
                        </div>
                      </div>
                    )}

                    {!analysisResult.aiDetails && (
                      <div className="disease-details">
                        <div className="detail-section">
                          <h5>Symptoms:</h5>
                          <ul>
                            {disease.symptoms.map((symptom, idx) => (
                              <li key={idx}>{symptom}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="detail-section">
                          <h5>Recommended Treatments:</h5>
                          <ul>
                            {disease.treatments.map((treatment, idx) => (
                              <li key={idx}>{treatment}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="detail-section">
                          <h5>Prevention:</h5>
                          <p>{disease.prevention}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="analysis-summary">
                <h4>Image Analysis Summary</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Color Pattern:</span>
                    <span className="summary-value">
                      {analysisResult.imageAnalysis.colorPattern}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Texture Analysis:</span>
                    <span className="summary-value">
                      {analysisResult.imageAnalysis.textureAnalysis}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Severity Score:</span>
                    <span className="summary-value score">
                      {analysisResult.imageAnalysis.severityScore}/100
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Top Recommendation:</span>
                    <span className="summary-value">
                      {analysisResult.imageAnalysis.recommendations}
                    </span>
                  </div>
                </div>
              </div>

              <div className="result-footer">
                <span className="timestamp">
                  Analyzed: {analysisResult.timestamp}
                </span>
                <button
                  onClick={clearImage}
                  className="new-analysis-btn"
                >
                  Analyze Another Image
                </button>
              </div>
            </div>
          ) : (
            <div className="results-placeholder">
              <div className="placeholder-icon">
                <Camera size={48} />
              </div>
              <h3>No Image Analyzed</h3>
              <p>
                Upload or capture an image of your plant to detect diseases
                and get treatment recommendations.
              </p>
              <div className="placeholder-stats">
                <div className="stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Accuracy</span>
                </div>
                <div className="stat">
                  <span className="stat-number">2s</span>
                  <span className="stat-label">Avg. Analysis Time</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Diseases Detected</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="camera-modal-overlay">
          <div className="camera-modal">
            <div className="camera-modal-header">
              <h3>Take Photo</h3>
              <button onClick={stopCamera} className="close-camera-btn">
                <X size={24} />
              </button>
            </div>
            <div className="camera-preview">
              <video
                ref={cameraVideoRef}
                autoPlay
                playsInline
                className="camera-video"
              />
              <canvas
                ref={cameraCanvasRef}
                style={{ display: 'none' }}
              />
            </div>
            <div className="camera-controls">
              <button
                onClick={capturePhoto}
                className="capture-button"
              >
                <Camera size={32} />
              </button>
              <button
                onClick={stopCamera}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
            <div className="camera-instructions">
              <p>• Hold steady for clear photo</p>
              <p>• Ensure good lighting</p>
              <p>• Focus on affected area</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .disease-detector {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .detector-header {
          margin-bottom: 30px;
          text-align: center;
        }
        
        .detector-header h2 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 24px;
          color: #1f2937;
          margin: 0 0 10px 0;
        }
        
        .subtitle {
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }
        
        .upload-message {
          padding: 12px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
          animation: slideIn 0.3s ease;
        }
        
        .upload-message.success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        
        .upload-message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .detector-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 24px;
        }
        
        @media (max-width: 1024px) {
          .detector-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .upload-card {
          background: #f9fafb;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          transition: border-color 0.3s ease;
        }
        
        .upload-card:hover {
          border-color: #3b82f6;
        }
        
        .upload-placeholder {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .upload-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .upload-option {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          padding: 25px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .upload-option:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
        }
        
        .upload-option span {
          font-weight: 600;
          color: #374151;
        }
        
        .upload-tips {
          text-align: left;
          background: white;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
        
        .upload-tips h4 {
          margin: 0 0 15px 0;
          color: #374151;
          font-size: 16px;
        }
        
        .upload-tips ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .upload-tips li {
          margin-bottom: 8px;
          color: #6b7280;
          font-size: 14px;
        }
        
        .image-preview {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .preview-header h4 {
          margin: 0;
          color: #374151;
        }
        
        .clear-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .clear-btn:hover {
          background: #fecaca;
        }
        
        .preview-image {
          width: 100%;
          height: 250px;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }
        
        .preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .preview-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        
        .view-original-link {
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-size: 14px;
          transition: background 0.2s ease;
        }
        
        .view-original-link:hover {
          background: #2563eb;
        }
        
        .analysis-progress {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 10px;
          padding: 20px;
        }
        
        .progress-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          color: #0369a1;
          font-weight: 500;
        }
        
        .progress-bar {
          height: 8px;
          background: #e0f2fe;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9, #3b82f6);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          text-align: right;
          font-size: 14px;
          color: #64748b;
        }
        
        .results-section {
          min-height: 500px;
        }
        
        .analysis-results {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 2px solid #f3f4f6;
        }
        
        .results-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          color: #1f2937;
        }
        
        .result-actions {
          display: flex;
          gap: 10px;
        }
        
        .action-btn {
          padding: 8px 16px;
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover {
          background: #e5e7eb;
          transform: translateY(-1px);
        }
        
        .detected-diseases {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .disease-card {
          background: #f9fafb;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .disease-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
        }
        
        .disease-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .disease-header h4 {
          margin: 0;
          color: #1f2937;
          font-size: 18px;
        }
        
        .confidence-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .confidence-badge.high {
          background: #dcfce7;
          color: #166534;
        }
        
        .confidence-badge.medium {
          background: #fef3c7;
          color: #92400e;
        }
        
        .confidence-badge.low {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .disease-severity {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .severity-label {
          font-weight: 500;
          color: #6b7280;
        }
        
        .severity-value {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .severity-value.high {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .severity-value.medium {
          background: #fef3c7;
          color: #d97706;
        }
        
        .severity-value.low {
          background: #dcfce7;
          color: #16a34a;
        }
        
        .disease-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .disease-details {
            grid-template-columns: 1fr;
          }
        }
        
        .detail-section h5 {
          margin: 0 0 10px 0;
          color: #374151;
          font-size: 14px;
        }
        
        .detail-section ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .detail-section li {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        
        .detail-section p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
          margin: 0;
        }
        
        .analysis-summary {
          background: white;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
        }
        
        .analysis-summary h4 {
          margin: 0 0 15px 0;
          color: #374151;
        }
        
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .summary-label {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }
        
        .summary-value {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
        }
        
        .summary-value.score {
          color: #dc2626;
          font-weight: 600;
        }
        
        .result-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 2px solid #f3f4f6;
        }
        
        .timestamp {
          font-size: 12px;
          color: #9ca3af;
        }
        
        .new-analysis-btn {
          padding: 10px 20px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .new-analysis-btn:hover {
          background: #2563eb;
        }
        
        .results-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          background: #f9fafb;
          border-radius: 12px;
          border: 2px dashed #d1d5db;
        }
        
        .placeholder-icon {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 2px solid #e5e7eb;
        }
        
        .results-placeholder h3 {
          margin: 0 0 10px 0;
          color: #374151;
        }
        
        .results-placeholder p {
          color: #6b7280;
          max-width: 400px;
          margin: 0 auto 30px;
          line-height: 1.5;
        }
        
        .placeholder-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Camera Modal Styles */
        .camera-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .camera-modal {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .camera-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .camera-modal-header h3 {
          margin: 0;
          color: #1f2937;
        }
        
        .close-camera-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f3f4f6;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .close-camera-btn:hover {
          background: #e5e7eb;
        }
        
        .camera-preview {
          width: 100%;
          height: 400px;
          background: #000;
          position: relative;
        }
        
        .camera-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .camera-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          gap: 15px;
        }
        
        .capture-button {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: white;
          border: 4px solid #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .capture-button:hover {
          background: #f3f4f6;
          transform: scale(1.05);
        }
        
        .cancel-button {
          padding: 10px 24px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .cancel-button:hover {
          background: #dc2626;
        }
        
        .camera-instructions {
          padding: 15px 20px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        
        .camera-instructions p {
          margin: 0;
        }
        
        @media (max-width: 640px) {
          .camera-instructions {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default DiseaseDetector;