const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');

async function startServer() {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`server is listening at ${url}`);
}

startServer();

process.on('uncaughtException', (err) => {
  console.log(`An error occurred`)
  console.log(err)
})
