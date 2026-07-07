const express = require('express');
const router = express.Router();
const prototypeController = require('../controllers/prototypeController');

router.post('/signup', prototypeController.signupFarmer);
router.post('/login', prototypeController.loginFarmer);
router.post('/ask', prototypeController.askQuestion);

module.exports = router;
