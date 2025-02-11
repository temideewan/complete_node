const express = require('express');

// create express router
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require('../controllers/book-controller');

// all books routes

router.get('/get', getAllBooks);

router.get('/get/:id', getBookById);

router.post('/add', addNewBook);

router.put('/update/:id', updateBook);

router.delete('/delete/:id', deleteBook);

module.exports = router;
