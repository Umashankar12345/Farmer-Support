const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');

// Middleware to authenticate user (assuming it attaches req.user)
// We will use a mock middleware if real auth middleware isn't easily accessible,
// but let's try to use the existing authMiddleware if it exists.
const { verifyJWT } = require('../middleware/auth');

router.get('/', verifyJWT, fieldController.getFields);
router.post('/register', verifyJWT, fieldController.registerField);

module.exports = router;
