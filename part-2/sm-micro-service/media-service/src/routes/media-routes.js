const express = require('express');
const { uploadMedia } = require('../controllers/media-controller');
const { authenticateRequest } = require('../middleware/auth-middleware');
const logger = require('../utils/logger');
const upload = require('../utils/multer');
const multer = require('multer');

const router = express.Router();

router.post(
  '/upload',
  authenticateRequest,
  (req, res, next) => {
    console.log('Hitting this endpoint')
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        logger.error('Multer error while uploading file');
        return res.status(400).json({
          message: 'Multer error while uploading file',
          error: err.message,
          stack: err.stack,
        });
      } else if (err) {
        logger.error('Unknown error while uploading file');
        return res.status(400).json({
          message: 'Unknown error while uploading file',
          error: err.message,
          stack: err.stack,
        });
      }

      if (!req.file) {
        logger.error('No file found Please add a file and try again');
        return res.status(400).json({
          message: 'No file found add a file and try again',
        });
      }
      next();
    });
  },
  uploadMedia
);
module.exports = router;
