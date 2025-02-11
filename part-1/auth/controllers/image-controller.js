const Image = require('../models/Image');
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require('../helpers/cloudinary-helper');
const fs = require('fs');
const paginatedResourceHelper = require('../helpers/pagination-helper');

const uploadImageController = async (req, res) => {
  try {
    // check if file is missing in request object
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: 'File is required, Please upload an image',
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // store the image url and public id along with the user details for the image
    const newImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newImage.save();

    // delete the file from local storage
    fs.unlinkSync(req.file.path);
    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: newImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        success: false,
        message: 'Something went wrong! Please try again',
      });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // const sortBy = req.query.sortBy || 'createdAt';
    // const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    // const totalImages = await Image.countDocuments();
    // const totalPages = Math.ceil(totalImages / limit);
    // const sortObj = {};
    // sortObj[sortBy] = sortOrder;
    // const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    const { response: images, meta } = await paginatedResourceHelper(
      req,
      Image
    );
    if (images) {
      res.status(200).json({
        success: true,
        meta,
        message: 'Images fetched successfully',
        data: images,
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500),
      json({
        success: false,
        message: 'Something went wrong! Please try again',
      });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const imageIdToBeDeleted = req.params?.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(imageIdToBeDeleted);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    // check if the image belongs to the authenticated user
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You are not authorized to delete this image',
      });
    }

    // delete the image from cloudinary
    await deleteFromCloudinary(image.publicId);

    // delete the image from the database
    await Image.findByIdAndDelete(imageIdToBeDeleted);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        success: false,
        message: 'Something went wrong! Please try again',
      });
  }
};
module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};
