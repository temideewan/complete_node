const { prisma } = require('../config/prisma');

async function addBook(title, publishedDate, authorId, content = '') {
  try {
    const newlyCreatedBook = await prisma.book.create({
      data: {
        title,
        publishedDate,
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
      include: {
        author: true,
      },
    });
    return newlyCreatedBook;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
      },
    });
    return books;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });
    return book;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function updateBook(id, newTitle) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error('No book with the id: ' + id + ' found');
    }
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: newTitle,
      },
      include: {
        author: true,
      },
    });
    return updatedBook;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function updateBookTransactions(id, newTitle) {
  try {
    const updatedBok = await prisma.$transaction(async (prisma) => {
      const book = await prisma.book.findUnique({ where: { id } });
      if (!book) {
        throw new Error(`Book with id ${id} not found`);
      }
      return prisma.book.update({
        where: { id },
        data: {
          title: newTitle,
        },
        include: { author: true },
      });
    });

    return updatedBok;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteBook() {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
      include: { author: true },
    });
    return deletedBook;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  updateBookTransactions,
  deleteBook,
};
