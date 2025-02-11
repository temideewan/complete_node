const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
try {
  const result = await cloudinary.uploader.upload(filePath)
  return {
    url: result.url,
    publicId: result.public_id,
  }
} catch (error) {
  console.error('Error while uploading to cloudinary', error);
  throw new Error()
}
}

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error while deleting from cloudinary', error);
    throw new Error();
  }
}

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
}
