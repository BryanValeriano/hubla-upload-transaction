import ITransactionRepository from "./repositories/ITransactionRepository";
import TransactionRepositoryJSON from "./repositories/json/transactionRepositoryJSON";

interface Container {
  transactionRepository: ITransactionRepository
}

const dev: Container = {
  transactionRepository: new TransactionRepositoryJSON()
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
