import TransactionRepositoryInMemory from "@/server/repositories/in-memory/transactionRepositoryInMemory"
import { describe, expect, it } from "vitest";
import UserRepositoryInMemory from "@/server/repositories/in-memory/userRepositoryInMemory";
import GetUserByNameService from "../getUserByName/getUserByNameService";
import ProcessTransactionService from "./processTransactionService";
import { TransactionType } from "@/server/entities/Transaction";
import { container } from "@/server/container";

function getRandomTransactionType(): TransactionType {
  const keys = Object.keys(TransactionType);
  const stringKeys = keys.filter(key => isNaN(Number(key)));
  const randomIndex = Math.floor(Math.random() * stringKeys.length);
  return TransactionType[stringKeys[randomIndex] as keyof typeof TransactionType];
}

describe("Process Transaction Service", () => {
  it("Should be able to process correctly 10 random transactions for the same user", async () => {
    const { transactionRepository } = container();
    const { userRepository } = container();

    const processTransactionService = new ProcessTransactionService({
      transactionRepository,
      userRepository
    });

    const getUserByNameService = new GetUserByNameService({
      userRepository
    });

    const userName = "teste";
    const samples = 10
    let balance = 0;

    for (let i = 0; i < samples; i++) {
      const value = Math.random();
      const transactionType = getRandomTransactionType();

      await processTransactionService.execute({
        type: transactionType,
        date: userName,
        productDescription: userName,
        value: value,
        transactionOwnerName: userName
      })

      balance += (processTransactionService.isReceivedTransaction(transactionType) ? 1 : -1) * value;
    }

    expect((await transactionRepository.getAll()).length).toBe(samples);
    expect(await getUserByNameService.execute(userName)).toEqual({ userName, balance });
  })
})
