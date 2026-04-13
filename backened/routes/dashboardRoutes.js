const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');

// Get dashboard data
router.get('/data', getDashboardData);

module.exports = router;