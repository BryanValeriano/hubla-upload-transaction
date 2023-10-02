import CreateTransactionService from "./createTransactionService";
import { describe, expect, it } from "vitest";
import { container } from "@/server/container";
import GetTransactionsService from "../getTransactions/getTransactionsService";

describe("Create Transaction Service", () => {
  it("Should be able to create a new transaction", async () => {
    const { transactionRepository } = container();

    const createTransactionService = new CreateTransactionService({
      transactionRepository: transactionRepository
    });

    const getTransactionsService = new GetTransactionsService({
      transactionRepository: transactionRepository
    });

    const postTransaction = await createTransactionService.execute({
      type: 1,
      date: "test",
      productDescription: "test",
      value: 10,
      transactionOwnerName: "Roberto"
    })

    const getTransaction = await getTransactionsService.execute();

    expect(getTransaction.length).toBe(1);
    expect(getTransaction).toEqual([postTransaction]);
  })
})
