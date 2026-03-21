require('dotenv').config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://farmesupport.vercel.app"],
  credentials: true,
}));

// Middleware
app.use(express.json());
// Add this near other static file serving middleware
app.use('/uploads', express.static('uploads'));
// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

// ========= IMPORT WEATHER ROUTES =========
// ========= IMPORT WEATHER ROUTES =========
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);

// ========= IMPORT AI ROUTES =========
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

// ========= IMPORT DIAGNOSE ROUTES =========
const diagnoseRoutes = require('./routes/diagnoseRoutes');
app.use('/api/v1', diagnoseRoutes);


// ========= AUTH ROUTES =========
app.post("/api/auth/login", (req, res) => {
  res.json({
    success: true,
    message: "Login successful",
    token: "mock-login-token",
    email: req.body.email,
  });
});

app.post("/api/auth/register", (req, res) => {
  res.json({
    success: true,
    message: "Signup successful",
    user: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
  });
});

// ========= DASHBOARD ROUTE =========
app.get("/api/dashboard", (req, res) => {
  res.json({
    success: true,
    message: "Dashboard data loaded",
    data: {
      crops: 2,
      alerts: 1,
      notifications: 3,
    },
  });
});

// ========= START SERVER =========
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
