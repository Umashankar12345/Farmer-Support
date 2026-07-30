const express = require('express');
const router = express.Router();
const { processFarmerQuery } = require('../controllers/farmerQueryController');

router.post('/farmer-query', processFarmerQuery);

module.exports = router;
