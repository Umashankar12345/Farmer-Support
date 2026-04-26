const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const { verifyJWT } = require('../middleware/auth');

// In a real app, you'd check for an 'Admin' role here
router.get('/', verifyJWT, visitorController.getAllVisitors);

module.exports = router;
