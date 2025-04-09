const express = require('express');
const { createPost, getAllPosts, getPost, deletePost } = require('../controllers/post-controller');
const { authenticateRequest } = require('../middleware/auth-middleware');

const router = express.Router();

// middlewares -> to get an authenticated user
router.use(authenticateRequest);

router.post('/create-post', createPost);
router.get('/all-posts', getAllPosts);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

module.exports = router;
