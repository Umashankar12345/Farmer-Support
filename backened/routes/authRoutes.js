const express = require('express');
const router = express.Router();
const { register, login, sendOTP, verifyOTP, googleLoginSim } = require('../controllers/authController');

// OTP routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Google simulation route
router.post('/google', googleLoginSim);

// Register route
router.post('/signup', register);
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;