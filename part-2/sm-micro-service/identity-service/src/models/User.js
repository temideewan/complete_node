const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      return next(error);
    }
  }
});
UserSchema.methods.comparePasswords = async function (inputPassword) {
  try {
    return await argon2.verify(this.password, inputPassword);
  } catch (error) {
    throw error;
  }
};

UserSchema.index({ username: 'text' });
const User = mongoose.model('User', UserSchema);

module.exports = User;
