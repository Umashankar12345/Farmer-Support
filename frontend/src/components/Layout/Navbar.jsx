// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Button from "../UI/Button.jsx";
// import { Camera, Upload, X, User } from 'lucide-react';
// import './Navbar.css';

// const navItems = [
//   { name: "Dashboard", path: "/dashboard" },
//   { name: "My Farm", path: "/my-farm" },
//   { name: "Farm Mechanization", path: "/farm-mechanization" },
//   { name: "Crop Sown Analysis", path: "/crop-sown-analysis" },
//   { name: "Crop Production", path: "/crop-production" },
//   { name: "Fertilizer Recommendations", path: "/fertilizer-recommendations" },
//   { name: "Pest & Disease", path: "/pest-disease" },
//   { name: "Drought Dashboard", path: "/drought-dashboard" },
//   { name: "Community Forum", path: "/community-forum" },
// ];

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeNav, setActiveNav] = useState("Dashboard");
//   const [showCameraModal, setShowCameraModal] = useState(false);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const navigate = useNavigate();

//   const handleNavigation = (path, name) => {
//     setActiveNav(name);
//     navigate(path);
//   };

//   const handleCameraClick = () => {
//     setShowCameraModal(true);
//     setIsMenuOpen(false);
//   };

//   const handleUploadClick = () => {
//     setShowUploadModal(true);
//     setIsMenuOpen(false);
//   };

//   const handleImageCaptured = (imageData) => {
//     console.log('Image captured from navbar:', imageData);
//     setShowCameraModal(false);
//     setShowUploadModal(false);

//     // Navigate to disease detector with the image
//     navigate('/pest-disease', { state: { image: imageData } });
//   };

//   const handleImageUploaded = (imageData) => {
//     console.log('Image uploaded from navbar:', imageData);
//     setShowUploadModal(false);
//     setShowCameraModal(false);

//     // Navigate to disease detector with the image
//     navigate('/pest-disease', { state: { image: imageData } });
//   };

//   // Camera Modal Component
//   const CameraModal = () => (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h3 className="text-xl font-bold text-gray-800">Capture Plant Photo</h3>
//           <button 
//             onClick={() => setShowCameraModal(false)} 
//             className="modal-close p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X size={24} className="text-gray-600" />
//           </button>
//         </div>
//         <div className="modal-body p-6">
//           <div className="camera-instructions text-center">
//             <div className="flex justify-center mb-4">
//               <div className="camera-icon-container">
//                 <Camera size={48} className="text-blue-600" />
//               </div>
//             </div>
//             <h4 className="text-xl font-semibold text-gray-800 mb-2">Camera Access Required</h4>
//             <p className="text-gray-600 mb-6">
//               Click the button below to open camera for capturing plant images.
//             </p>
//             <div className="camera-tips">
//               <p className="font-semibold text-gray-700 mb-2">Tips for best results:</p>
//               <ul className="text-gray-600 list-disc pl-5 space-y-1">
//                 <li>Use back camera for better quality</li>
//                 <li>Ensure good lighting</li>
//                 <li>Focus on affected areas</li>
//                 <li>Hold camera steady</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <div className="flex gap-3">
//             <button 
//               className="btn-primary"
//               onClick={() => {
//                 const mockImageData = {
//                   url: 'https://via.placeholder.com/300',
//                   filename: 'camera-capture.jpg',
//                   timestamp: new Date().toISOString()
//                 };
//                 handleImageCaptured(mockImageData);
//               }}
//             >
//               <Camera size={20} />
//               Open Camera
//             </button>
//             <button 
//               className="btn-secondary"
//               onClick={() => setShowCameraModal(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Upload Modal Component
//   const UploadModal = () => (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h3 className="text-xl font-bold text-gray-800">Upload Plant Image</h3>
//           <button 
//             onClick={() => setShowUploadModal(false)} 
//             className="modal-close p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X size={24} className="text-gray-600" />
//           </button>
//         </div>
//         <div className="modal-body p-6">
//           <div className="upload-instructions text-center">
//             <div className="flex justify-center mb-4">
//               <div className="upload-icon-container">
//                 <Upload size={48} className="text-purple-600" />
//               </div>
//             </div>
//             <h4 className="text-xl font-semibold text-gray-800 mb-2">Select Image from Device</h4>
//             <p className="text-gray-600 mb-6">
//               Choose an image of your plant for disease analysis.
//             </p>

//             <div className="upload-form">
//               <div className="file-upload-area">
//                 <Upload size={32} className="text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-600">Drag & drop image here or click to browse</p>
//                 <input 
//                   type="file" 
//                   id="file-upload"
//                   accept="image/*"
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       const imageUrl = URL.createObjectURL(file);
//                       handleImageUploaded({
//                         url: imageUrl,
//                         filename: file.name,
//                         file: file
//                       });
//                     }
//                   }}
//                 />
//               </div>

//               <div className="upload-requirements">
//                 <p className="font-semibold text-gray-700 mb-2">Requirements:</p>
//                 <ul className="text-gray-600 list-disc pl-5 space-y-1">
//                   <li>Max file size: 5MB</li>
//                   <li>Supported formats: JPG, PNG, GIF</li>
//                   <li>Clear, well-lit images work best</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <div className="flex gap-3">
//             <button 
//               className="btn-secondary"
//               onClick={() => setShowUploadModal(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <header className="w-full bg-white shadow-md">
//         {/* Top Bar */}
//         <div className="flex items-center justify-between p-4 border-b">
//           {/* Logo Section */}
//           <div className="flex items-center gap-3">
//             <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
//               🌾
//             </div>
//             <span className="font-bold text-xl">Digital Krishi Officer</span>
//           </div>

//           {/* Desktop Actions - NOW WITH CAMERA BUTTON VISIBLE */}
//           <div className="hidden md:flex items-center gap-3">
//             {/* CAMERA BUTTON - Now visible! */}
//             <button
//               onClick={handleCameraClick}
//               className="camera-action-btn"
//               title="Capture Plant Photo"
//             >
//               <Camera size={20} />
//               <span>Camera</span>
//             </button>

//             {/* UPLOAD BUTTON */}
//             <button
//               onClick={handleUploadClick}
//               className="upload-action-btn"
//               title="Upload Plant Image"
//             >
//               <Upload size={20} />
//               <span>Upload</span>
//             </button>

//             {/* Language Selector */}
//             <Button style={{ background: "white", color: "black", border: "1px solid #ccc" }}>
//               English ⬇️
//             </Button>

//             {/* Notifications */}
//             <Button style={{ background: "white", color: "black", border: "1px solid #ccc" }}>
//               🔔 3
//             </Button>

//             {/* User Profile Section */}
//             <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
//               <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User size={16} className="text-blue-600" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm font-medium text-gray-700">Farmer User</span>
//                 <span className="text-xs text-gray-500">umashankarkumar9572@gmail.com</span>
//               </div>
//             </div>

//             {/* Logout Button */}
//             <Button 
//               onClick={() => navigate("/login")}
//               className="ml-2"
//             >
//               Logout
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-2xl" 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? "✖" : "☰"}
//           </button>
//         </div>

//         {/* Navigation Bar */}
//         <nav className="hidden md:flex bg-green-600 text-white px-4">
//           {navItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => handleNavigation(item.path, item.name)}
//               className={`px-4 py-3 font-medium ${
//                 activeNav === item.name ? "bg-green-800" : "hover:bg-green-700"
//               } transition-colors duration-200`}
//             >
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg p-4">
//             {/* User Info in Mobile */}
//             <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User size={18} className="text-blue-600" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-800">Farmer User</span>
//                 <span className="text-sm text-gray-600">umashankarkumar9572@gmail.com</span>
//               </div>
//             </div>

//             {/* Camera & Upload buttons in mobile menu */}
//             <div className="mobile-action-buttons">
//               <button
//                 onClick={handleCameraClick}
//                 className="camera-action-btn justify-center"
//               >
//                 <Camera size={20} />
//                 <span>Camera</span>
//               </button>

//               <button
//                 onClick={handleUploadClick}
//                 className="upload-action-btn justify-center"
//               >
//                 <Upload size={20} />
//                 <span>Upload</span>
//               </button>
//             </div>

//             {/* Navigation items */}
//             <div className="space-y-1 mb-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => {
//                     handleNavigation(item.path, item.name);
//                     setIsMenuOpen(false);
//                   }}
//                   className={`block w-full text-left px-4 py-3 rounded-lg ${
//                     activeNav === item.name 
//                       ? "bg-green-100 text-green-800 font-semibold" 
//                       : "text-gray-700 hover:bg-gray-100"
//                   } transition-colors duration-200`}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>

//             {/* Mobile action buttons */}
//             <div className="flex gap-2 pt-4 border-t">
//               <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
//                 English ⬇️
//               </button>
//               <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
//                 🔔 3
//               </button>
//               <button 
//                 className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 onClick={() => {
//                   navigate("/login");
//                   setIsMenuOpen(false);
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Camera Modal */}
//       {showCameraModal && <CameraModal />}

//       {/* Upload Modal */}
//       {showUploadModal && <UploadModal />}
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../UI/Button.jsx";
import { Camera, Upload, X, User, Menu, Bell, Moon, Sun } from 'lucide-react'; // Added Moon, Sun
import axios from 'axios';
import './Navbar.css';

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Farm", path: "/my-farm" },
  { name: "Farm Mechanization", path: "/farm-mechanization" },
  { name: "Crop Sown Analysis", path: "/crop-sown-analysis" },
  { name: "Crop Production", path: "/crop-production" },
  { name: "Fertilizer Recommendations", path: "/fertilizer-recommendations" },
  { name: "Pest & Disease", path: "/pest-disease" },
  { name: "Drought Dashboard", path: "/drought-dashboard" },
  { name: "Community Forum", path: "/community-forum" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const navigate = useNavigate();

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleNavigation = (path, name) => {
    setActiveNav(name);
    navigate(path);
  };

  const handleCameraClick = () => {
    setShowCameraModal(true);
    setIsMenuOpen(false);
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
    setIsMenuOpen(false);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setMessage('Please select an image file');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to backend
  const uploadImage = async () => {
    if (!selectedFile) {
      setMessage('Please select an image first');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('✅ Image uploaded successfully!');

        // Navigate to pest-disease page
        setTimeout(() => {
          navigate('/pest-disease', {
            state: {
              imageUrl: response.data.imageUrl,
              filename: response.data.filename
            }
          });
          resetModals();
        }, 1500);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('❌ Failed to upload image: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  const resetModals = () => {
    setShowCameraModal(false);
    setShowUploadModal(false);
    setSelectedFile(null);
    setPreview(null);
    setMessage('');
  };

  // Camera Modal Component
  const CameraModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Capture Plant Photo</h3>
          <button onClick={resetModals} className="modal-close">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="camera-instructions">
            <div className="camera-icon-container">
              <Camera size={48} className="text-blue-600" />
            </div>
            <h4>Camera Access Required</h4>
            <p>Select an image for plant disease analysis.</p>

            {message && (
              <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            {preview ? (
              <div className="preview-section">
                <h5 className="font-semibold mb-2">Preview:</h5>
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-4" />
                <div className="flex gap-3">
                  <button
                    onClick={uploadImage}
                    disabled={uploading}
                    className="btn-primary"
                  >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="btn-secondary"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => document.getElementById('camera-file').click()}
                    className="flex-1 flex flex-col items-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50"
                  >
                    <Camera size={32} className="text-blue-600 mb-2" />
                    <span>Use Camera</span>
                  </button>
                  <button
                    onClick={() => document.getElementById('gallery-file').click()}
                    className="flex-1 flex flex-col items-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50"
                  >
                    <Upload size={32} className="text-purple-600 mb-2" />
                    <span>From Gallery</span>
                  </button>
                </div>

                <input
                  type="file"
                  id="camera-file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <input
                  type="file"
                  id="gallery-file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </>
            )}

            <div className="camera-tips mt-6">
              <p>Tips for best results:</p>
              <ul>
                <li>Use clear, well-lit photos</li>
                <li>Focus on affected areas</li>
                <li>Max file size: 5MB</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={resetModals}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Upload Modal Component
  const UploadModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Upload Plant Image</h3>
          <button onClick={resetModals} className="modal-close">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="upload-instructions">
            <div className="upload-icon-container">
              <Upload size={48} className="text-purple-600" />
            </div>
            <h4>Select Image from Device</h4>
            <p>Choose an image for disease analysis.</p>

            {message && (
              <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="upload-form">
              <div
                className="file-upload-area"
                onClick={() => document.getElementById('upload-file').click()}
              >
                <Upload size={32} className="text-gray-400 mb-3" />
                <p>Click to select image</p>
                <p className="text-sm text-gray-500 mt-1">or drag and drop here</p>
                <input
                  type="file"
                  id="upload-file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              {preview && (
                <div className="preview-section mt-4">
                  <h5 className="font-semibold mb-2">Preview:</h5>
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <div className="flex gap-3">
                    <button
                      onClick={uploadImage}
                      disabled={uploading}
                      className="btn-primary"
                    >
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                      }}
                      className="btn-secondary"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              )}

              <div className="upload-requirements mt-6">
                <p>Requirements:</p>
                <ul>
                  <li>Max file size: 5MB</li>
                  <li>Supported: JPG, PNG, GIF</li>
                  <li>Clear images work best</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={resetModals}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="w-full bg-white shadow-md">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              🌾
            </div>
            <span className="font-bold text-xl">Digital Krishi Officer</span>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600 dark:text-gray-300" />}
            </button>

            <button
              onClick={handleCameraClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors"
              title="Capture Plant Photo"
            >
              <Camera size={20} />
              <span className="font-medium">Camera</span>
            </button>

            <button
              onClick={handleUploadClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/40 transition-colors"
              title="Upload Plant Image"
            >
              <Upload size={20} />
              <span className="font-medium">Upload</span>
            </button>

            <button className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <div className="h-9 w-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                F
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Farmer User</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full w-fit">Premium 💎</span>
              </div>
            </div>

            <Button onClick={() => navigate("/login")} className="ml-2 !bg-red-50 !text-red-600 hover:!bg-red-100 dark:!bg-red-900/20 dark:!text-red-400 border-none transition-colors">Logout</Button>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden md:flex bg-green-600 text-white px-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className={`px-4 py-3 ${activeNav === item.name ? "bg-green-800" : "hover:bg-green-700"
                }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4">
            <div className="mobile-action-buttons">
              <button
                onClick={handleCameraClick}
                className="camera-action-btn justify-center"
              >
                <Camera size={20} />
                <span>Camera</span>
              </button>

              <button
                onClick={handleUploadClick}
                className="upload-action-btn justify-center"
              >
                <Upload size={20} />
                <span>Upload</span>
              </button>
            </div>

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.path, item.name);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-2 py-2 border-b ${activeNav === item.name
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "hover:bg-gray-100"
                  }`}
              >
                {item.name}
              </button>
            ))}

            <div className="mt-4 pt-4 border-t flex gap-2">
              <button className="flex-1 px-4 py-2 border rounded">
                English ⬇️
              </button>
              <button className="flex-1 px-4 py-2 border rounded">
                🔔 3
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => navigate("/login")}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      {showCameraModal && <CameraModal />}
      {showUploadModal && <UploadModal />}

      <style jsx>{`
        .message {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-weight: 500;
          text-align: center;
        }
        
        .message.success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        
        .message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        
        .preview-section {
          margin-top: 20px;
        }
        
        @media (max-width: 768px) {
          .modal-overlay {
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;