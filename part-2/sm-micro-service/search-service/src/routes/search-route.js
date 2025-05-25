const express = require('express')
const {searchPostController} = require('../controllers/search-controller');
const {authenticateRequest} = require('../middleware/auth-middleware');

const router = express.Router();

router.use(authenticateRequest)
router.post('/posts', searchPostController)

module.exports = router;
