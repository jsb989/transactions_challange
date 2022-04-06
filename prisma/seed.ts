import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { transactions_array } from "../src/files/transactions";

async function main() {
  for (const transaction of transactions_array) {
    await prisma.transactions.create({
      data: {
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
        createdAt: new Date(transaction.createdAt),
        updatedAt: new Date(transaction.updatedAt),
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