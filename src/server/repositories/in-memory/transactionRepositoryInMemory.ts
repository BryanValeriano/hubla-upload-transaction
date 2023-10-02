import Transaction from "@/server/entities/Transaction";
import ITransactionRepository from "../ITransactionRepository";

export default class TransactionRepositoryInMemory implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async insert(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }

  public async clear(): Promise<void> {
    this.transactions = [];
  }
}
