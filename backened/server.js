const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');

dotenv.config();

const app = express();

// Security and Performance Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // For local dev images
}));
app.use(compression());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- EXISTING ROUTES (Preserved as requested) ---
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- NEW EXTENDED ROUTES ---
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/query', require('./routes/queryRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/market', require('./routes/marketRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Basic health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Digital Krishi API is running!',
    version: '2.4.0-STABLE',
    status: 'Operational'
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Krishi Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(`   Run this to fix it:\n   netstat -ano | findstr :${PORT}\n   taskkill /PID <PID> /F\n`);
    process.exit(1);
  } else {
    throw err;
  }
});