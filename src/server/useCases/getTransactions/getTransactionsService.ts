import ITransactionRepository from "@/server/repositories/ITransactionRepository";
import { Transaction } from "@prisma/client";

type Dependencies = {
  transactionRepository: ITransactionRepository;
}

export default class GetTransactionsService {
  private transactionRepository: ITransactionRepository;

  constructor({ transactionRepository }: Dependencies) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.getAll();
    return transactions;
  }
}
