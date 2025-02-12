const { default: mongoose } = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book');

const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: 'The author name is required', success: false });
    }
    const author = new Author({ name, bio });
    await author.save();
    res
      .status(201)
      .json({ message: 'Author created successfully', success: true, author });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error occurred', success: false });
  }
};
const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !mongoose.isObjectIdOrHexString(author)) {
      return res
        .status(400)
        .json({ message: 'Title and author are required', success: false });
    }
    const book = new Book({ title, author });
    await book.save();
    res
      .status(201)
      .json({ message: 'Book created successfully', success: true, book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error occurred', success: false });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) {
      return res.status(404).json({ message: 'Book not found', success: false });
    }
    res.json({ message: 'Book retrieved successfully', success: true, book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error occurred', success: false });
  }
};

module.exports = {
  createAuthor,
  createBook,
  getBookWithAuthor,
};
