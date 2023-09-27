import Transaction from "../entities/Transaction"

type Output = Omit<Transaction, "id">

export default interface IFileTransactionParser {
  parse(data: string): { transactions: Output[], errors: string[] }
}
