import ITransactionRepository from "./repositories/ITransactionRepository";
import IUserRepository from "./repositories/IUserRepository";
import TransactionRepositoryJSON from "./repositories/json/transactionRepositoryJSON";
import UserRepositoryJSON from "./repositories/json/userRepositoryJSON";
import TransactionRepositoryPrismaMySQL from "./repositories/prisma/transactionsRepositoryPrismaMySQL";
import { UserRepositoryPrismaMySQL } from "./repositories/prisma/usersRepositoryPrismaMySQL";

interface Container {
  transactionRepository: ITransactionRepository
  userRepository: IUserRepository;
}

//const dev: Container = {
//  transactionRepository: new TransactionRepositoryJSON(),
//  userRepository: new UserRepositoryJSON()
//}

const prod: Container = {
  transactionRepository: new TransactionRepositoryPrismaMySQL(),
  userRepository: new UserRepositoryPrismaMySQL()
}

export function container(): Container {
  const mode = process.env.MODE || 'prod'

  switch (mode) {
    //case 'dev':
    //  return dev
    case 'prod':
      return prod
    default:
      throw new Error('Invalid mode')
  }
}
