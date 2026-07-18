const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');

// Middleware to authenticate user (assuming it attaches req.user)
// We will use a mock middleware if real auth middleware isn't easily accessible,
// but let's try to use the existing authMiddleware if it exists.
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, fieldController.getFields);
router.post('/register', authMiddleware, fieldController.registerField);

module.exports = router;
