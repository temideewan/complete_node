const express = require('express');
const app = express();

// express middlewares
app.use(express.json());

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

// intro
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our bookstore' });
});

// get all books
app.get('/books', (req, res) => {
  res.json({ data: books });
});

// get a single book
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id <= 0 || id > books.length) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  const book = books.find((book) => book.id == id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json({ data: book });
});

// add a new book
app.post('/add', (req, res) => {
  const newId = Math.floor(Math.random() * 1000)
  const newBook = {
    id: newId,
    title: `Book ${newId}`,
    author: `Author ${newId}`,
  };
  books.push(newBook);
  res.status(200).json({
    message: 'New book added successfully',
    data: books,
  });
});

app.put('/update/:id', (req, res) => {
  const findCurrentBook = books.find((book) => book.id == req.params.id);
  if (!findCurrentBook) {
    return res.status(404).json({ message: 'Book not found' });
  }
  findCurrentBook.title = req?.body?.title || findCurrentBook.title;
  res
    .status(200)
    .json({
      message: `Book with ID ${req.params.id} updated successfully`,
      data: findCurrentBook,
    });
});

app.delete('/delete/:id', (req, res) => {
  const index = books.findIndex((book) => book.id == req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  const deletedBook = books.splice(index, 1)
  res.status(200).json({
    message: `Book with ID ${req.params.id} deleted successfully`,
    data: deletedBook,
  });
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
