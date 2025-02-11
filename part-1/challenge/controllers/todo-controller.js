const Todo = require('../models/todo');

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({}).select('-__v');
    if (!allTodos) {
      return res
        .status(404)
        .json({ success: false, message: 'No todos found' });
    }
    res.json({
      success: true,
      data: allTodos,
      message: 'Todos found successfully',
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later',
    });
  }
};
const getSingleTodo = async (req, res) => {
  const todoId = req.params.id;
  if (!todoId) {
    return res.status(404).json({ message: 'Invalid todo id', success: false });
  }
  const todo = await Todo.findById(todoId);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found', success: false });
  }
  res.json({ success: true, data: todo, message: 'Todo found successfully' });
  try {
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong please try again later' });
  }
};
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: 'The todo requires a title', success: false });
    }
    const newTodo = await Todo.create({ title, description });
    res.json({
      success: true,
      data: newTodo,
      message: 'Todo created successfully',
    });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong please try again later' });
  }
};
const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const todoUpdates = req.body;
  if (!todoId) {
    return res.status(404).json({ message: 'Invalid todo id', success: false });
  }
  const { title, description, completed } = todoUpdates;
  if (!title && !description && typeof completed != 'boolean') {
    return res
      .status(400)
      .json({ message: 'At least one field must be updated', success: false });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { title, description, completed },
    { returnDocument: 'after' }
  );
  res.json({
    success: true,
    data: updatedTodo,
    message: 'Todo updated successfully',
  });

  try {
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong please try again later' });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    if (!todoId) {
      return res
        .status(404)
        .json({ message: 'Invalid todo id', success: false });
    }
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res
       .status(404)
       .json({ message: 'Todo not found', success: false });
    }
    res.status(200).json({
      success: true,
      data: deletedTodo,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong please try again later' });
  }
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
