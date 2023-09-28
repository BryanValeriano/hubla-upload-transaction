import TransactionRepositoryInMemory from "@/server/repositories/in-memory/transactionRepositoryInMemory"
import { describe, expect, it } from "vitest";
import { TransactionType } from "@/server/entities/Transaction";
import UserRepositoryInMemory from "@/server/repositories/in-memory/userRepositoryInMemory";
import GetUserByNameService from "../getUserByName/getUserByNameService";
import ProcessTransactionService from "./processTransactionService";

describe("Process Transaction Service", () => {
  it("Should be able to process correctly 10 random transactions for the same user", async () => {
    const transactionRepository = new TransactionRepositoryInMemory();
    const userRepository = new UserRepositoryInMemory();

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
      const transactionType = (Math.random() > 0.5 ?
        TransactionType.RECEIVED_MONEY : TransactionType.PAYED_MONEY);

      await processTransactionService.execute({
        type: transactionType,
        date: userName,
        productDescription: userName,
        value: value,
        transactionOwnerName: userName
      })

      balance += (transactionType == TransactionType.RECEIVED_MONEY ? 1 : -1) * value;
    }

    expect((await transactionRepository.getAll()).length).toBe(samples);
    expect(await getUserByNameService.execute(userName)).toEqual({ userName, balance });
  })
})
