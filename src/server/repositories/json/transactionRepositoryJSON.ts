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
    fs.readFile(this.filePath, (error) => {
      console.error(`Error reading the file ${this.filePath}:`, error)
    })
  }

  private async saveToFile(transactions: Transaction[]) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(transactions));
    } catch (error) {
      console.error(`Error writing to file ${this.filePath}:`, error); // Log any errors during the write operation
    }
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
    let transactions: Transaction[] = [];

    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      if (data) {
        transactions = JSON.parse(data);
      } else {
        console.error(`File ${this.filePath} is empty.`);
      }
    } catch (error) {
      console.error(`Error reading or parsing file ${this.filePath}:`, error);
    }

    return transactions.map((transaction) => new Transaction({ ...transaction }));
  }
}
