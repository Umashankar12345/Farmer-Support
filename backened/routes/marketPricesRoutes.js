const express = require('express');
const router = express.Router();
const { getLiveMandiPrices } = require('../controllers/marketController');

router.get('/', getLiveMandiPrices);

module.exports = router;
