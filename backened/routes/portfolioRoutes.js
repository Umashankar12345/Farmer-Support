const express = require('express');
const router = express.Router();
const { getFarmerPortfolio, logAction, updateTaskStatus } = require('../controllers/portfolioController');
const { verifyJWT } = require('../middleware/auth');

router.get('/', verifyJWT, getFarmerPortfolio);
router.post('/:fieldId/action', verifyJWT, logAction);
router.put('/:fieldId/task/:taskId', verifyJWT, updateTaskStatus);

module.exports = router;
