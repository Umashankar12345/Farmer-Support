const express = require('express');
const router = express.Router();
const { getFarmerPortfolio } = require('../controllers/portfolioController');

router.get('/', getFarmerPortfolio);

module.exports = router;
