const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: { type: String, required: [true, 'A todo title is required'] },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
