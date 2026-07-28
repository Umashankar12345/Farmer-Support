const express = require('express');
const router = express.Router();
const cropRecommenderController = require('../controllers/cropRecommenderController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, cropRecommenderController.recommendCrops);

module.exports = router;
