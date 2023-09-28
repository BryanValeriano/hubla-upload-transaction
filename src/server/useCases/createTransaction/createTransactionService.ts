import Transaction from "@/server/entities/Transaction";
import ITransactionRepository from "@/server/repositories/ITransactionRepository";
import { v4 as uuid } from "uuid";

type Dependencies = {
  transactionRepository: ITransactionRepository;
}
type Input = Omit<Transaction, 'id'>

export default class CreateTransactionService {
  private transactionRepository: ITransactionRepository;

  constructor({ transactionRepository }: Dependencies) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ type, date, productDescription, value, transactionOwnerName }: Input): Transaction {
    const id = uuid()
    const transaction = new Transaction({
      id,
      type,
      date,
      productDescription,
      value,
      transactionOwnerName
    })
    this.transactionRepository.insert(transaction);
    return transaction;
  }
}
