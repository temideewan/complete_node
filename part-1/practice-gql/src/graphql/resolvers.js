const todos = require('../db/todos');

const resolvers = {
  Query: {
    getAllTodos: () => todos,
    getTodo: (_, { id }) => {
      const foundIndex = todos.findIndex((todo) => todo.id === id);
      if (foundIndex === -1) return null;
      return todos[foundIndex];
    },
  },

  Mutation: {
    addTodo: (_, { title, description, completed = false }) => {
      if (!title) return null;
      const newTodo = {
        id: String(todos.length + 1),
        title,
        description,
        completed,
      };
      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (_, { id }) => {
      const foundIndex = todos.findIndex((todo) => todo.id === id);
      if (foundIndex === -1) return false;
      todos.slice(foundIndex, 1);
      return true;
    },
    updateTodo: (_, { id, ...updates }) => {
      const foundIndex = todos.findIndex((todo) => todo.id === id);
      if (foundIndex === -1) return null;
      const foundTodo = todos[foundIndex];
      foundTodo = { ...foundTodo, ...updates };
      return foundTodo;
    },
  },
};

module.exports = resolvers;
