const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
router.post('/create', bookController.addBook);
router.get('/get-all', bookController.getAllBooks);
router.get('/get-one/:id', bookController.getBookById);
router.put('/update-one/:id', bookController.updateBook);
router.delete('/delete-one/:id', bookController.deleteBook);

module.exports = router;
