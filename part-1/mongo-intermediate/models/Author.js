const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  name: String,
  bio: String,
});
const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
