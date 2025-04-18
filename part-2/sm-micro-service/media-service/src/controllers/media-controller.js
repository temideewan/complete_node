const { uploadMediaToCloudinary } = require('../utils/cloudinary');
const logger = require('../utils/logger');
const Media = require('../models/media');

const uploadMedia = async (req, res) => {
  logger.info('Starting media upload....');
  try {
    if (!req.file) {
      logger.error('No file found! Please add a file and try again.');
      return res.status(400).json({
        success: false,
        message: 'No file found! Please add a file and try again.',
      });
    }

    const { originalname, mimetype } = req.file;
    const userId = req.user.userId;
    logger.info(`File details: name=${originalname}, type=${mimetype}`);
    logger.info(`Uploading to cloudinary`);
    if (!originalname || !mimetype) {
      logger.info('Invalid values for "originalname" and "mimetype"');
      res.status(400).json({
        success: false,
        message: 'Invalid values for "originalname" and "mimetype"',
      });
    }
    const cloudinaryUploadResult = await uploadMediaToCloudinary(req.file);
    logger.info(
      `Cloudinary upload successful. Public Id: - ${cloudinaryUploadResult.public_id}`
    );
    const newlyCreatedMedia = new Media({
      publicId: cloudinaryUploadResult.public_id,
      originalName: originalname,
      mimeType: mimetype,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });

    await newlyCreatedMedia.save();
    res.status(201).json({
      success: true,
      mediaId: newlyCreatedMedia._id,
      url: newlyCreatedMedia.url,
      message: 'Media upload is successful',
    });
  } catch (e) {
    logger.error(`Error uploading media ${e}`);
    res.status(500).json({
      success: false,
      message: 'Error uploading media',
    });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const result = await Media.find({});
    logger.info(`Gotten all media from DB`);
    res.status(200).json({
      success: true,
      result,
      message: 'Media gotten from DB',
    });
  } catch (e) {
    logger.error(`Error fetching media ${e}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching media',
    });
  }
};

module.exports = { uploadMedia, getAllMedia };
