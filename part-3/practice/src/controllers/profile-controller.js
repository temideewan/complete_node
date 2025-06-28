const {
  createProfile,
  deleteProfile,
  getAllProfile,
  getProfile,
  updateProfile,
} = require('../services/profile-service');
module.exports.addProfile = async (req, res) => {
  const defaultUserAvatar =
    'http://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg';
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please pass the appropriate body for the request',
      });
    }
    const {
      name = undefined,
      email = undefined,
      avatar = defaultUserAvatar,
    } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'name and email are required',
      });
    }

    const newProfile = await createProfile({ name, email, avatar });

    if (!newProfile) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while creating user profile',
      });
    }
    res.status(201).json({ success: true, data: newProfile });
  } catch (e) {
    res.status(400).json({
      status: false,
      message:
        e.message || 'Something went wrong while trying to create a profile',
    });
  }
};
module.exports.getUserProfile = async (req, res) => {};
module.exports.getAllUserProfiles = async (req, res) => {};
module.exports.updateUserProfile = async (req, res) => {};
module.exports.deleteUserProfile = async (req, res) => {};
