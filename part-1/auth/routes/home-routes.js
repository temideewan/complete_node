const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
router.get('/welcome', authMiddleware, (req, res) => {
  const {username, userId, role} = req.userInfo
  res.json({  
    success: true,
    message: 'Welcome to the home page',
    user: {
      _id: userId,
      username: username,
      role: role,
    }
  });
});

module.exports = router;
