const express = require('express');
const { createPost } = require('../controllers/post-controller');
const { authenticateRequest } = require('../middleware/auth-middleware');

const router = express.Router();

// middlewares -> to get an authenticated user
router.use(authenticateRequest);

router.post('/create-post', createPost);

module.exports = router;
