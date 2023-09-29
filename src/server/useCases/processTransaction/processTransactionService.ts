import ITransactionRepository from "@/server/repositories/ITransactionRepository";
import IUserRepository from "@/server/repositories/IUserRepository";
import CreateTransactionService from "../createTransaction/createTransactionService";
import CreateUserService from "../createUser/createUserService";
import UpdateUserBalanceService from "../updateUserBalance/updateUserBalanceService";
import Transaction, { TransactionType } from "@/server/entities/Transaction";


type Dependencies = {
  transactionRepository: ITransactionRepository;
  userRepository: IUserRepository;
}

type Input = Omit<Transaction, 'id'>

export default class ProcessTransactionService {
  private createTransactionService: CreateTransactionService;
  private createUserService: CreateUserService;
  private updateUserBalanceService: UpdateUserBalanceService;

  constructor({ transactionRepository, userRepository }: Dependencies) {
    this.createTransactionService = new CreateTransactionService({ transactionRepository });
    this.createUserService = new CreateUserService({ userRepository })
    this.updateUserBalanceService = new UpdateUserBalanceService({ userRepository })
  }

  public isReceivedTransaction(type: TransactionType): boolean {
    const receivedTransactionTypes = [
      TransactionType.ProducerSale,
      TransactionType.AffiliateSale,
      TransactionType.ComissionReceived
    ];
    return receivedTransactionTypes.includes(type);
  }

  public async execute(input: Input): Promise<Transaction> {
    const transaction = await this.createTransactionService.execute(input);
    const user = await this.createUserService.execute({ userName: input.transactionOwnerName });
    user.balance += (this.isReceivedTransaction(transaction.type) ? 1 : -1) * transaction.value;
    await this.updateUserBalanceService.execute(user);
    return transaction;
  }
}
