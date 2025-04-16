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

    const { originalName, mimeType } = req.file;
    const userId = req.user.userId;
    logger.info(`File details: name=${originalName}, type=${mimeType}`);
    logger.info(`Uploading to cloudinary`);

    const cloudinaryUploadResult = await uploadMediaToCloudinary(req.file);
    logger.info(
      `Cloudinary upload successful. Public Id: - ${cloudinaryUploadResult.public_id}`
    );
    const newlyCreatedMedia = new Media({
      publicId: cloudinaryUploadResult.public_id,
      originalName,
      mimeType,
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

module.exports = { uploadMedia };
