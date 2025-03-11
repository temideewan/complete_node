require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');
const connectDB = require('./database/db.js');
async function startServer() {
  await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
  });

  console.log(`Server ready at ${url}`);
}

startServer();
