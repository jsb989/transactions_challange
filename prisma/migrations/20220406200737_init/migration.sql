-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "account" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "category" VARCHAR(255),
    "reference" VARCHAR(255),
    "currency" VARCHAR(10) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
