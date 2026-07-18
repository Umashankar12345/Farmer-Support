const express = require('express');
const router = express.Router();
const yieldController = require('../controllers/yieldController');

router.post('/harvest', yieldController.addHarvestLog);
router.get('/prediction', yieldController.getPrediction);

module.exports = router;
