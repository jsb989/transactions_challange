import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { transactions_array } from "../files/transactions";

async function main() {
  for (const transaction of transactions_array) {
    // TODO add data validation
    const parseTransactionDate = new Date(transaction.transactionDate);
    const parseCreatedAt = new Date(transaction.createdAt);
    const parseUpdatedAt = new Date(transaction.updatedAt);
    await prisma.transactions.create({
      data: {
        ...transaction,
        transactionDate: parseTransactionDate,
        createdAt: parseCreatedAt,
        updatedAt: parseUpdatedAt,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });