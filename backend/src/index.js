const { ApolloServer, gql, PubSub } = require("apollo-server-express");
const express = require("express");
const { v4 } = require("uuid");
const http = require("http");

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const BOOK_ADDED = "BOOK_ADDED";

const books = [
  {
    id: v4(),
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: v4(),
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_, { title, author }, { pubsub }) => {
      const book = { id: v4(), title, author };
      pubsub.publish(BOOK_ADDED, { bookAdded: book });
      return book;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
};

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub }),
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`,
  );
});
