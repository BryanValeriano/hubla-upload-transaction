import Transaction from "@/server/entities/Transaction";
import ITransactionRepository from "../ITransactionRepository";
import fs from "fs";
import path from "node:path";

export default class TransactionRepositoryJSON implements ITransactionRepository {
  private filePath = path.join(
    'src',
    'server',
    'repositories',
    'json',
    'files',
    "transactions.json"
  );

  constructor() {
    fs.readFile(this.filePath, (err) => {
      console.error("Error on loading JSON database")
    })
  }

  private async saveToFile(transactions: Transaction[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(transactions));
  }

  async clear(): Promise<void> {
    await this.saveToFile([])
  }

  async insert(transaction: Transaction): Promise<void> {
    const transactions = this.getTransactionsFromFile();
    transactions.push(transaction);
    this.saveToFile(transactions);
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.getTransactionsFromFile()];
  }

  private getTransactionsFromFile(): Transaction[] {
    const transactions: Transaction[] = JSON.parse(fs.readFileSync(
      this.filePath,
      'utf8',
    ));
    return transactions.map((transaction) => new Transaction({ ...transaction }));
  }
}
