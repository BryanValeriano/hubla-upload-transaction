import ITransactionRepository from "@/server/repositories/ITransactionRepository";

type Dependencies = {
  transactionRepository: ITransactionRepository;
}

export default class GetTransactionsService {
  private transactionRepository: ITransactionRepository;

  constructor({ transactionRepository }: Dependencies) {
    this.transactionRepository = transactionRepository;
  }

  public execute() {
    const transactions = this.transactionRepository.getAll();
    return transactions;
  }
}
