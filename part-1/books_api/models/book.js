const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxLength: [100, 'Book title cannot be more than 100 characters'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year of publication is required'],
    min: [1000, 'Year of publication must be at least 1000'],
    max: [
      new Date().getFullYear(),
      'Year of publication cannot be in the future',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
