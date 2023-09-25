import { v4 as uuid } from "uuid";
import Transaction from "../entities/Transaction";
import ITransactionRepository from "../repositories/ITransactionRepository";

type Input = Omit<Transaction, 'id'>

export default class CreateTransactionService {
  constructor(private transactionRepository: ITransactionRepository) { }

  async execute({ type, date, productDescription, value, transactionOwnerName }: Input) {
    const id = uuid()
    const transaction = new Transaction({
      id,
      type,
      date,
      productDescription,
      value,
      transactionOwnerName
    })
    await this.transactionRepository.insert(transaction);
    return transaction;
  }
}
