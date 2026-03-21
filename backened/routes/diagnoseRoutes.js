// backend/routes/diagnoseRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { diagnoseImage } = require('../controllers/diagnoseController');

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `scan-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/diagnose', upload.single('image'), diagnoseImage);

module.exports = router;
