import ITransactionRepository from "./repositories/ITransactionRepository";
import IUserRepository from "./repositories/IUserRepository";
import TransactionRepositoryJSON from "./repositories/json/transactionRepositoryJSON";
import UserRepositoryJSON from "./repositories/json/userRepositoryJSON";

interface Container {
  transactionRepository: ITransactionRepository
  userRepository: IUserRepository;
}

const dev: Container = {
  transactionRepository: new TransactionRepositoryJSON(),
  userRepository: new UserRepositoryJSON()
}

export function container(): Container {
  const mode = process.env.MODE || 'dev'

  switch (mode) {
    case 'dev':
      return dev
    default:
      throw new Error('Invalid mode')
  }
}
