const { prisma } = require('../config/prisma');

async function addAuthor(name) {
  try {
    const newAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    return newAuthor;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: {id},
      include: {book: true}
    })

    return deletedAuthor;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

module.exports = { addAuthor, deleteAuthor };
