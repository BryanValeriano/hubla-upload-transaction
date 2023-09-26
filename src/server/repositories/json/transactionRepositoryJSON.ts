import Transaction from "@/server/entities/Transaction";
import ITransactionRepository from "../ITransactionRepository";
import fs from "fs";
import path from "node:path";
const databasePath = path.join(__dirname, "./transactions.json");

export default class TransactionRepositoryJSON implements ITransactionRepository {
  async insert(transaction: Transaction): Promise<void> {
    const transactions = this.getTransactionsFromFile();
    transactions.push(transaction);
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.getTransactionsFromFile()];
  }

  private getTransactionsFromFile(): Transaction[] {
    const transactions: Transaction[] = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    return transactions.map((transaction) => new Transaction({ ...transaction }));
  }
}
