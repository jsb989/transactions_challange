import { gql } from "apollo-server";
import { Context } from "./context";
import { Prisma } from "@prisma/client";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: Date) {
    return value //.toISOString().split("T")[0].split("-").reverse().join('/'); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: string) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const typeDefs = gql`
  scalar Date

  type Query {
    getAllTransactions: [Transaction!]
    getTransactionsByDate(startDate: String, endDate: String): [Transaction!]
    getTransactionById(id: ID!): Transaction!
  }

  type Transaction {
    id: ID!
    account: String!
    description: String
    category: String
    reference: String
    currency: String!
    amount: Float!
    status: String!
    transactionDate: Date!
    createdAt: Date!
    updatedAt: Date!
  }
`;

export const resolvers = {
  Date: dateScalar,
  Query: {
    getAllTransactions: async (_obj: any, _args: any, context: Context, _info: any) => {
      const response = await context.prisma.transactions.findMany();

      return response;
    },
    getTransactionsByDate: async ( _obj: any, _args: any, context: Context, _info: any) => {
      const { startDate, endDate } = _args;

      const response = await context.prisma.transactions.findMany({
        where: {
          transactionDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      });

      console.log(response);
      return response;
    },
    getTransactionById: async ( _obj: any, args: Prisma.TransactionsWhereUniqueInput, context: Context, _info: any) => {
      const { id } = args;

      const response = await context.prisma.transactions.findUnique({
        where: {
          id,
        },
      });

      return response;
    },
  },
};