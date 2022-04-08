import { gql } from 'apollo-server'
import { makeExecutableSchema } from 'apollo-server'
const { GraphQLScalarType, Kind } = require('graphql');
import { Context } from './context'
import { Prisma } from '@prisma/client'

const typeDefs = gql`
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
    transactionDate: String!
    createdAt: String!
    updatedAt: String!
  }
`

const resolvers = {
  Query: {
    getAllTransactions: async (_obj: any, _args: any, context: Context, _info: any) => {
      const response = await context.prisma.transactions.findMany()

      return response
    },
    getTransactionsByDate: async (_obj: any, _args: any, context: Context, _info: any) => {
      const { startDate, endDate } = _args

      const response = await context.prisma.transactions.findMany({
        where: {
          transactionDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      })

      console.log(response)
      return response
    },
    getTransactionById: async (_obj: any, args: Prisma.TransactionsWhereUniqueInput, context: Context, _info: any) => {
      const { id } = args

      const response = await context.prisma.transactions.findUnique({
        where: {
          id,
        },
      })

      return response
    },
  }
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})