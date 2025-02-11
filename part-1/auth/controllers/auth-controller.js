const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passwordHasher = require('../helpers/password-hash-helper');
const registerUser = async (req, res) => {
  try {
    // extract user information from request body
    const { username, email, password, role } = req.body;

    // check if the user already exists in the database
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          'A user with this Username or email already exists on our platform, please try with a different username or email',
      });
    }
    // use bcrypt to hash user password
    const hashedPassword = await passwordHasher(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await newUser.save();
    if (newUser) {
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to register user, please try again',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again ',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // extract user name and password from request body
    const { username, password } = req.body;
    // find user in the database by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    // compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    // create JWT token with the user details.
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again ',
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo?.userId;
    // extract old password and new password
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Old password and new password are required',
      });
    }

    // find current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    // check if the old password is right.
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Old password is incorrect, please try again',
      });
    }
    const hashedPassword = await passwordHasher(newPassword);
    // update user password
    user.password = hashedPassword;
    await user.save();
    // send success message to the user.
    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again ',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
