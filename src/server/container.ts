import ITransactionRepository from "./repositories/ITransactionRepository";
import TransactionRepositoryInMemory from "./repositories/in-memory/transactionRepositoryInMemory";

interface Container {
  transactionRepository: ITransactionRepository
}

const dev: Container = {
  transactionRepository: new TransactionRepositoryInMemory()
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
