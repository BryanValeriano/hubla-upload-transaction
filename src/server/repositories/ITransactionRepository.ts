import Transaction from "../entities/Transaction";

export default interface ITransactionRepository {
  insert(transaction: Transaction): Promise<void>
  getAll(): Promise<Transaction[]>
  clear(): Promise<void>
}

