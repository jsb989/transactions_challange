import { loadFilesSync, mergeTypeDefs } from "graphql-tools";
import path from "path";

const mergePath = loadFilesSync(
  path.join(__dirname, "modules/**/graphql/*.graphql")
);

const schema = mergeTypeDefs(mergePath);

export default schema;

// https://dev.to/nditah/how-to-build-a-graphql-api-with-apollo-server-and-prisma-1bfj