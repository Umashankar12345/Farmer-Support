const express = require('express');
const router = express.Router();
const { getFarmerPortfolio } = require('../controllers/portfolioController');
const { verifyJWT } = require('../middleware/auth');

router.get('/', verifyJWT, getFarmerPortfolio);

module.exports = router;
