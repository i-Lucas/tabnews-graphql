import { ApolloServer } from "apollo-server";
import errorHandler from "./middlewares/errorHandler.js";
import { ApolloServerPluginLandingPageGraphQLPlayground as Playground } from "apollo-server-core";

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typedefs/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  ...errorHandler,
  plugins: [Playground()],
});

server
  .listen(5000)
  .then(({ url }) => console.log("server is running at " + url)); // http://localhost:5000/
