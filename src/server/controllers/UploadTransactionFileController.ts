import Transaction from "../entities/Transaction";
import IFileTransactionParser from "../parser/IFileTransactionParser";
import ITransactionRepository from "../repositories/ITransactionRepository";
import IUserRepository from "../repositories/IUserRepository";
import ProcessTransactionService from "../useCases/processTransaction/processTransactionService";

type Output = Omit<Transaction, "id">

type UploadTransactionFileControllerProps = {
  parser: IFileTransactionParser;
  transactionRepository: ITransactionRepository;
  userRepository: IUserRepository;
}

export default class UploadTransactionFileController {
  private parser: IFileTransactionParser;
  private processTransactionService: ProcessTransactionService;

  constructor({ parser, transactionRepository, userRepository }: UploadTransactionFileControllerProps) {
    this.parser = parser;
    this.processTransactionService = new ProcessTransactionService({
      transactionRepository,
      userRepository
    })
  }

  public async execute(file: string): Promise<{ transactions: Output[], errors: string[] }> {
    const { transactions, errors } = this.parser.parse(file);
    if (!errors.length) {
      for (const transaction of transactions) {
        await this.processTransactionService.execute(transaction);
      }
    }
    return { transactions, errors }
  }
}
