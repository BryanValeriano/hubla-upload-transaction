import Transaction from "@/server/entities/Transaction";
import ITransactionRepository from "../ITransactionRepository";

export default class TransactionRepositoryInMemory implements ITransactionRepository {
  private transactions: Transaction[] = [];

  insert(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }
}
