import { PrismaClient, Transaction as PrismaTransaction } from '@prisma/client';
import ITransactionRepository from "../ITransactionRepository";
import Transaction from "@/server/entities/Transaction";

export default class TransactionRepositoryPrisma implements ITransactionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async insert(transaction: Transaction): Promise<void> {
    try {
      await this.prisma.transaction.create({
        data: {
          id: transaction.id,
          type: transaction.type,
          date: transaction.date,
          productDescription: transaction.productDescription,
          value: transaction.value,
          transactionOwnerName: transaction.transactionOwnerName,
        }
      });
    } catch (error) {
      console.error('Error inserting transaction:', error);
    }
  }

  public async getAll(): Promise<Transaction[]> {
    try {
      const transactions: PrismaTransaction[] = await this.prisma.transaction.findMany();
      return transactions.map(transaction => new Transaction({
        id: transaction.id,
        type: transaction.type,
        date: transaction.date,
        productDescription: transaction.productDescription,
        value: transaction.value,
        transactionOwnerName: transaction.transactionOwnerName,
      }));
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      return [];
    }
  }

  public async clear(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
