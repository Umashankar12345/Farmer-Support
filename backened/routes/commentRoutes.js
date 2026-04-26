const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyJWT } = require('../middleware/auth');

router.post('/', verifyJWT, commentController.createComment);
router.get('/', commentController.getComments);

module.exports = router;
