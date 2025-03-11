const { gql } = require('graphql-tag');

const typeDefs = gql`
type Todo{
  id: ID!
  title: String!
  description: String
  completed: Boolean!
}

type Query {
  getAllTodos: [Todo]!
  getTodo(id: ID!): Todo
}
type Mutation {
  addTodo(title: String! description: String completed: Boolean!): Todo
  deleteTodo(id: ID!): Boolean
  updateTodo(id: ID! title: String description: String completed: Boolean): Todo
}
`;

module.exports = typeDefs;
