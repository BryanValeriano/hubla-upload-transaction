import ITransactionRepository from "@/server/repositories/ITransactionRepository";

type Dependencies = {
  transactionRepository: ITransactionRepository;
}

export default class GetTransactionsService {
  private transactionRepository: ITransactionRepository;

  constructor({ transactionRepository }: Dependencies) {
    this.transactionRepository = transactionRepository;
  }

  async execute() {
    const transactions = await this.transactionRepository.getAll();
    return transactions;
  }
}
