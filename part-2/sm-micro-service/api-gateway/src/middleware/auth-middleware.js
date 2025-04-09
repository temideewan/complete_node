const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) {
    logger.warn('Trying to access endpoint without valid token');
    return res.status(401).json({
      status: false,
      message: 'Authentication required',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    logger.warn('Trying to access endpoint without valid token');
    return res.status(401).json({
      status: false,
      message: 'Authentication required',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn('Invalid token!');
      return res.status(429).json({
        status: false,
        message: 'Invalid token!',
      });
    }
    req.user = user;
    next();
  });
};

module.exports = {validateToken};
