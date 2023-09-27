import Transaction from "../entities/Transaction";
import ITransactionRepository from "../repositories/ITransactionRepository";
import GetTransactionsService from "../useCases/getTransactions/getTransactionsService";

type GetAllTransactionsControllerProps = {
  transactionRepository: ITransactionRepository;
}
export default class GetAllTransactionsController {
  private transactionRepository: ITransactionRepository;
  private getTransactionsService: GetTransactionsService;

  constructor({ transactionRepository }: GetAllTransactionsControllerProps) {
    this.transactionRepository = transactionRepository;
    this.getTransactionsService = new GetTransactionsService({
      transactionRepository: this.transactionRepository
    });

  }

  public async execute(): Promise<Transaction[]> {
    return await this.getTransactionsService.execute();
  }
}
