const express = require('express');
const router = express.Router();
const { setupFirstField } = require('../controllers/journeyController');

router.post('/setup-field', setupFirstField);

module.exports = router;
