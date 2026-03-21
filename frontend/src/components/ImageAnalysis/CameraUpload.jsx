import React, { useState, useRef } from 'react';
import axios from 'axios';
import './CameraUpload.css';

const CameraUpload = ({ onImageSelect, onClose, type = 'crop' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start camera for capturing
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera if available
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      showMessage('Camera access denied or not available', 'error');
      console.error('Camera error:', error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setPreview(imageDataUrl);
    setSelectedImage(imageDataUrl);
    stopCamera();
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showMessage('File size should be less than 5MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to server
  const uploadImage = async () => {
    if (!selectedImage) {
      showMessage('Please select or capture an image first', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();

    try {
      if (typeof selectedImage === 'string') {
        // Convert data URL to blob for captured images
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('capture', blob, `capture-${Date.now()}.jpg`);
      } else {
        // For file uploads
        formData.append('image', selectedImage);
      }

      // Add additional metadata if needed
      formData.append('type', type);
      formData.append('timestamp', new Date().toISOString());

      const response = await axios.post('/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        showMessage('Image uploaded successfully!', 'success');
        if (onImageSelect) {
          onImageSelect({
            url: response.data.imageUrl,
            filename: response.data.filename,
            type: type
          });
        }
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Upload failed:', error);
      showMessage('Failed to upload image. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const resetSelection = () => {
    setSelectedImage(null);
    setPreview('');
    stopCamera();
  };

  return (
    <div className="camera-upload-container">
      <div className="camera-upload-header">
        <h3>{type === 'crop' ? 'Crop Image' : 'Upload Photo'}</h3>
        {onClose && (
          <button className="close-btn" onClick={onClose}>×</button>
        )}
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="camera-preview-area">
        {isCapturing ? (
          <div className="camera-view">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              className="camera-video"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        ) : preview ? (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        ) : (
          <div className="placeholder">
            <div className="placeholder-icon">📷</div>
            <p>No image selected</p>
          </div>
        )}
      </div>

      <div className="camera-controls">
        {!isCapturing && !preview && (
          <>
            <button 
              className="btn btn-primary"
              onClick={startCamera}
            >
              📷 Open Camera
            </button>
            <button 
              className="btn btn-secondary"
              onClick={openFilePicker}
            >
              📁 Choose from Gallery
            </button>
          </>
        )}

        {isCapturing && (
          <div className="capture-controls">
            <button 
              className="btn btn-capture"
              onClick={capturePhoto}
            >
              📸 Capture Photo
            </button>
            <button 
              className="btn btn-secondary"
              onClick={stopCamera}
            >
              Cancel
            </button>
          </div>
        )}

        {preview && (
          <div className="preview-controls">
            <button 
              className="btn btn-primary"
              onClick={uploadImage}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={resetSelection}
            >
              Take Another
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
      />

      <div className="instructions">
        <p><strong>Instructions:</strong></p>
        <ul>
          <li>Use camera for immediate capture</li>
          <li>Or choose from device gallery</li>
          <li>Ensure good lighting for clear images</li>
          <li>Max file size: 5MB</li>
          <li>Supported formats: JPG, PNG, GIF</li>
        </ul>
      </div>
    </div>
  );
};

export default CameraUpload;