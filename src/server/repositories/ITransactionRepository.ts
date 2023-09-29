import Transaction from "../entities/Transaction";

export default interface ITransactionRepository {
  insert(transaction: Transaction): void
  getAll(): Promise<Transaction[]>
}

