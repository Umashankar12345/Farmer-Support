const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
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
  origin: '*', // For production flexibility, or specify your render URL
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
app.use('/api/comments', require('./routes/comments'));
app.use('/api/visitors', require('./routes/visitorRoutes'));
app.use("/api/pest-alerts",  require("./routes/pestAlerts"));
app.use("/api/user",         require("./routes/userPreferences"));
app.use("/api/diagnosis",    require("./routes/diagnosisRoutes"));
app.use("/api/prototype",    require("./routes/prototypeRoutes"));
app.use("/api/yield",        require("./routes/yieldRoutes"));
app.use("/api/fields",       require("./routes/fieldRoutes"));
// Serve static files (uploads and dist)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Basic health check for Render
app.get('/health', (req, res) => {
  res.json({ status: 'Operational', version: '2.4.0-STABLE' });
});

// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
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