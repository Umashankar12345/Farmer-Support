const express = require('express');
const router = express.Router();
const { getNdviData } = require('../controllers/satelliteController');

router.get('/ndvi/:farmId', getNdviData);

module.exports = router;
