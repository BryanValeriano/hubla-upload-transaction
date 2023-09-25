export default interface ITransactionRepository {
  save(transaction: any): Promise<void>
}

