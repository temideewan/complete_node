const bookService = require('../services/bookService');

exports.addBook = async (req, res) => {
  try {
    const { title, publishedDate, authorId, content } = req.body;
    const book = await bookService.addBook(
      title,
      new Date(publishedDate),
      authorId,
      content
    );
    res.status(201).json({ message: 'Book created successfully', data: book });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res
      .status(200)
      .json({ message: 'Books returned successfully', data: books });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.getBookById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({message: "Please enter a valid book id (number)"})
    }
    const book = await bookService.getBookById(id);
    if(!book){
      return res.status(404).json({message: "Book not found"})
    }
    res.status(200).json({ message: 'Book returned successfully', data: book });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({message: "Please enter a valid book id (number)"})
    }
    const {title} = req.body;
    const book = await bookService.updateBook(id, title)
     if(!book){
      return res.status(404).json({message: "Book not found"})
    }
   res.status(200).json({ message: 'Book updated successfully', data: book }); 
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({message: "Please enter a valid book id (number)"})
    }
    await bookService.deleteBook(id)
    res.status(200).json({message: "Book deleted"})
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
