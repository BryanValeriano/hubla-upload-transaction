import Transaction from "../entities/Transaction";
import IFileTransactionParser from "../parser/IFileTransactionParser";
import ITransactionRepository from "../repositories/ITransactionRepository";
import CreateTransactionService from "../useCases/createTransaction/createTransactionService";

type Output = Omit<Transaction, "id">

type UploadTransactionFileControllerProps = {
  parser: IFileTransactionParser;
  transactionRepository: ITransactionRepository;
}

export default class UploadTransactionFileController {
  private parser: IFileTransactionParser;
  private transactionRepository: ITransactionRepository;
  private createTransactionService: CreateTransactionService;

  constructor({ parser, transactionRepository }: UploadTransactionFileControllerProps) {
    this.parser = parser;
    this.transactionRepository = transactionRepository;
    this.createTransactionService = new CreateTransactionService({
      transactionRepository: this.transactionRepository
    })
  }

  public execute(file: string): { transactions: Output[], errors: string[] } {
    const { transactions, errors } = this.parser.parse(file);
    if (!errors.length) {
      transactions.forEach((transaction) => {
        this.createTransactionService.execute(transaction);
      })
    }
    return { transactions, errors }
  }
}
