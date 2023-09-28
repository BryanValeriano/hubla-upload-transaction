import TransactionRepositoryInMemory from "@/server/repositories/in-memory/transactionRepositoryInMemory"
import CreateTransactionService from "./createTransactionService";
import { describe, expect, it } from "vitest";
import { TransactionType } from "@/server/entities/Transaction";

describe("Create Transaction Service", () => {
  it("Should be able to create a new transaction", async () => {
    const transactionRepository = new TransactionRepositoryInMemory();
    const createTransactionService = new CreateTransactionService({
      transactionRepository: transactionRepository
    });

    const transaction = createTransactionService.execute({
      type: TransactionType.RECEIVED_MONEY,
      date: "test",
      productDescription: "test",
      value: 10,
      transactionOwnerName: "Roberto"
    })

    expect((transactionRepository.getAll()).length).toBe(1);
  })
})
