const authorService = require('../services/authorService');

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const author = await authorService.addAuthor(name);
    res
      .status(201)
      .json({ message: 'Author created successfully', data: author });
  } catch (e) {
    res.status(400), json({ error: e.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'Please enter a valid author id (number)' });
    }
    const author = await authorService.deleteAuthor(id);
    res
      .status(200)
      .json({ message: 'Author deleted successfully', data: author });
  } catch (e) {
    res.status(400), json({ error: e.message });
  }
};
