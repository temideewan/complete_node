const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks.length > 0) {
      res.json({
        success: true,
        message: 'All books fetched successfully',
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No books found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again',
    });
  }
};
const getBookById = async (req, res) => {
  try {
    const currentBookId = req.params.id;
    const book = await Book.findById(currentBookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found, Please try with a proper book id',
      });
    } else {
      res.json({
        success: true,
        message: 'Book fetched successfully',
        data: book,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again',
    });
  }
};
const addNewBook = async (req, res) => {
  try {
    const newBookData = req.body;
    const newBook = await Book.create(newBookData);
    if (newBook) {
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again',
    });
  }
};
const updateBook = async (req, res) => {
  try {
    const {title, author, year} = req.body;
    const updatedBookId = req.params.id;
    if(!title && !author && !year){
      return res.status(400).json({
        success: false,
        message: 'Title, author and year are required fields',
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(updatedBookId, {title, author, year},);
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found, Please try with a proper book id',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again',
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found, Please try with a proper book id',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again',
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
