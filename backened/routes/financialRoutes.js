const express = require('express');
const router = express.Router();
const { calculateFarmROI } = require('../controllers/financialController');

router.get('/roi/:farmId', calculateFarmROI);

module.exports = router;
