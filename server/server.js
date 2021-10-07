const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const { ApolloServer } = require('apollo-server-express')
const { auth } = require('./utils/auth')
const { typeDefs, resolvers } = require('./schema')

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: auth
})
await ApolloServer.start();

server.applyMiddleware({ app, path: '/' })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`GraphQL is running at http://localhost:${PORT}${server.graphqlPath}`)
  })
});
