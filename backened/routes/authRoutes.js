const express = require('express');
const router = express.Router();
const { register, login, sendOTP, verifyOTP } = require('../controllers/authController');

// OTP routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Register route
router.post('/signup', register);
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;