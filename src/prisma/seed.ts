import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { transactions_array } from "../files/transactions";

async function main() {
  for (const transaction of transactions_array) {
    await prisma.transactions.create({
      data: transaction,
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