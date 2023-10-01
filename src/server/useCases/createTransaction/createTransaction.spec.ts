import CreateTransactionService from "./createTransactionService";
import { describe, expect, it } from "vitest";
import { container } from "@/server/container";

describe("Create Transaction Service", () => {
  it("Should be able to create a new transaction", async () => {
    const { transactionRepository } = container();
    const createTransactionService = new CreateTransactionService({
      transactionRepository: transactionRepository
    });

    const transaction = await createTransactionService.execute({
      type: 1,
      date: "test",
      productDescription: "test",
      value: 10,
      transactionOwnerName: "Roberto"
    })

    expect((await transactionRepository.getAll()).length).toBe(1);
  })
})
