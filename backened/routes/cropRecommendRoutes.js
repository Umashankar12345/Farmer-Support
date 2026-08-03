const express = require('express');
const router = express.Router();
const cropRecommenderController = require('../controllers/cropRecommenderController');
const { verifyJWT } = require('../middleware/auth');

router.post('/', verifyJWT, cropRecommenderController.recommendCrops);

module.exports = router;
