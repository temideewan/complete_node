const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
