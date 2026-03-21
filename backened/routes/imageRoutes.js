// backend/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload image endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image uploaded' 
      });
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload image',
      message: error.message 
    });
  }
});

// Capture image from camera endpoint
router.post('/capture', upload.single('capture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image captured' 
      });
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      message: 'Image captured successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Capture error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to capture image',
      message: error.message 
    });
  }
});

// Get all uploaded images (optional)
router.get('/all', (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const images = files.map(file => ({
      filename: file,
      url: `/uploads/images/${file}`,
      createdAt: fs.statSync(path.join(uploadDir, file)).birthtime
    }));
    
    res.json({
      success: true,
      images: images
    });
  } catch (error) {
    console.error('Error reading images:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch images' 
    });
  }
});

module.exports = router;