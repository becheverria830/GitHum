const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('./config');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!'
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://104.131.160.216:4000${server.graphqlPath}`)
);