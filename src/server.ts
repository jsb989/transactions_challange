import { ApolloServer } from "apollo-server";
import { context } from "./graphql/context";
import { resolvers, typeDefs } from "./graphql/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`graphql api running at ${url}graphql`);
});