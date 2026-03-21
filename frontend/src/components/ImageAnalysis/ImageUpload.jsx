import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Crop,
  Filter,
  Check
} from 'lucide-react';

const ImageUpload = ({ onImageUpload, onImageProcess }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageStats, setImageStats] = useState(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageStats({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          dimensions: `${img.width} × ${img.height}`,
          type: file.type,
          lastModified: new Date(file.lastModified).toLocaleDateString()
        });
      };
      img.src = e.target.result;
      
      setImage(file);
      setPreview(e.target.result);
      
      if (onImageUpload) {
        onImageUpload(file, e.target.result);
      }
      
      // Auto-process image
      setTimeout(() => {
        processImage(file);
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (file) => {
    setProcessing(true);
    
    // Simulate image processing
    setTimeout(() => {
      const mockProcessedData = {
        processed: true,
        features: ['Enhanced contrast', 'Noise reduction', 'Color correction'],
        readyForAnalysis: true
      };
      
      if (onImageProcess) {
        onImageProcess(mockProcessedData);
      }
      
      setProcessing(false);
    }, 1500);
  };

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          
          setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            canvas.toBlob((blob) => {
              const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
              processFile(file);
              stream.getTracks().forEach(track => track.stop());
            }, 'image/jpeg');
          }, 1000);
        })
        .catch(console.error);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setImageStats(null);
  };

  return (
    <div className="image-upload-container">
      {!preview ? (
        <div
          ref={dropAreaRef}
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <div className="upload-icon">
              <Upload size={48} />
            </div>
            
            <div className="upload-text">
              <h3>Drag & Drop Plant Image</h3>
              <p>or click to browse files</p>
              <p className="file-types">Supported: JPG, PNG, WebP (Max 5MB)</p>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
            
            <div className="upload-buttons">
              <button
                className="upload-btn primary"
                onClick={() => fileInputRef.current.click()}
              >
                <ImageIcon size={18} />
                Browse Files
              </button>
              
              <button
                className="upload-btn secondary"
                onClick={handleCameraCapture}
              >
                <Camera size={18} />
                Use Camera
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <h3>Image Preview</h3>
            <button onClick={clearImage} className="clear-btn">
              <X size={18} />
              Remove
            </button>
          </div>
          
          <div className="preview-image">
            <img src={preview} alt="Uploaded plant" />
            {processing && (
              <div className="processing-overlay">
                <div className="processing-spinner"></div>
                <p>Processing image...</p>
              </div>
            )}
          </div>
          
          <div className="preview-controls">
            <button className="control-btn">
              <ZoomIn size={16} />
            </button>
            <button className="control-btn">
              <ZoomOut size={16} />
            </button>
            <button className="control-btn">
              <RotateCw size={16} />
            </button>
            <button className="control-btn">
              <Crop size={16} />
            </button>
            <button className="control-btn">
              <Filter size={16} />
            </button>
          </div>
          
          {imageStats && (
            <div className="image-stats">
              <h4>Image Details</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Name:</span>
                  <span className="stat-value">{imageStats.name}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Size:</span>
                  <span className="stat-value">{imageStats.size}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Dimensions:</span>
                  <span className="stat-value">{imageStats.dimensions}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Type:</span>
                  <span className="stat-value">{imageStats.type}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="preview-footer">
            <button
              className="process-btn"
              onClick={() => processImage(image)}
              disabled={processing}
            >
              {processing ? (
                <>
                  <div className="spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Process for Analysis
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;