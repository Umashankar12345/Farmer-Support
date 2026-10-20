const express = require('express');
const router = express.Router();
const { register, login, sendOTP, verifyOTP, googleLoginSim, githubLoginSim } = require('../controllers/authController');

// OTP routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Social login simulation routes
router.post('/google', googleLoginSim);
router.post('/github', githubLoginSim);

// Register route
router.post('/signup', register);
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;