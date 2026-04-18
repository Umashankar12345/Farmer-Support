const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// --- SIMULATED OTP LOGIC ---
// In a real app, you would use an SMS gateway like Twilio or an Email service
exports.sendOTP = async (req, res) => {
  try {
    const { phone, dialCode } = req.body;
    console.log(`[SIMULATED] Sending OTP to ${dialCode} ${phone}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({
      success: true,
      message: `OTP sent successfully to ${dialCode} ${phone}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    
    // As per user spec: 000000 is error, anything else is success
    if (otp === '000000') {
      return res.status(400).json({ error: 'Incorrect OTP. Please try again.' });
    }
    
    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, dialCode, 
      password, role, farmSize, location, crop, state 
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (userExists) {
      return res.status(400).json({ 
        error: 'User already exists with this email or phone number' 
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dialCode,
      password,
      role: role || 'Farmer',
      farmSize: farmSize || 0,
      location: location || '',
      crop: crop || '',
      state: state || '',
      registrationNo: `FS-${Date.now()}`
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        farmSize: user.farmSize,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { id, password } = req.body; // id can be email or phone

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: id }, { phone: id }]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        registrationNo: user.registrationNo
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};