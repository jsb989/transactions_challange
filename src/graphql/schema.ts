import { gql } from 'apollo-server'
import { makeExecutableSchema } from 'apollo-server'
import { Context } from './context'
import { Prisma } from '@prisma/client'

const typeDefs = gql`
  type Query {
    getAllTransactions: [Transaction!]
    getTransactionsByDate(startMonth: String, endMonth: String): [Transaction!]
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
    // getTransactionsByDate: async (_obj: any, args: Prisma.TransactionsWhereUniqueInput, context: Context, _info: any) => {
    //   const { startMonth, endMonth } = args

    //   const response = await context.prisma.transactions.findUnique({
    //     where: {
    //       startMonth,
    //     },
    //   })

    //   return response
    // },
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