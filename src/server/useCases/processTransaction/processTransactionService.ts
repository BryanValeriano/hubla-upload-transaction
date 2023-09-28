import Transaction from "@/server/entities/Transaction";
import ITransactionRepository from "@/server/repositories/ITransactionRepository";
import IUserRepository from "@/server/repositories/IUserRepository";
import CreateTransactionService from "../createTransaction/createTransactionService";
import CreateUserService from "../createUser/createUserService";
import UpdateUserBalanceService from "../updateUserBalance/updateUserBalanceService";

type Dependencies = {
  transactionRepository: ITransactionRepository;
  userRepository: IUserRepository;
}

type Input = Omit<Transaction, 'id'>

enum TransactionType {
  RECEIVED_MONEY = 1 | 2 | 4,
  PAYED_MONEY = 3,
}

export default class ProcessTransactionService {
  private createTransactionService: CreateTransactionService;
  private createUserService: CreateUserService;
  private updateUserBalanceService: UpdateUserBalanceService;

  constructor({ transactionRepository, userRepository }: Dependencies) {
    this.createTransactionService = new CreateTransactionService({ transactionRepository });
    this.createUserService = new CreateUserService({ userRepository })
    this.updateUserBalanceService = new UpdateUserBalanceService({ userRepository })
  }

  async execute(input: Input) {
    const transaction = await this.createTransactionService.execute(input);
    const user = await this.createUserService.execute({ userName: input.transactionOwnerName });
    user.balance += (transaction.type == TransactionType.RECEIVED_MONEY ? 1 : -1) * transaction.value;
    this.updateUserBalanceService.execute(user);
    return transaction;
  }
}
