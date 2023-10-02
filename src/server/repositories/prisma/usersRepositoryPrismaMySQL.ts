import IUserRepository from '../IUserRepository';
import { prisma } from './config/prisma';
import User from '@/server/entities/User';

export class UserRepositoryPrismaMySQL implements IUserRepository {

  public async insert(user: User): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          userName: user.userName,
          balance: user.balance,
        },
      });
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }

  public async getByName(userName: string): Promise<User | undefined> {
    try {
      const userData = await prisma.user.findUnique({
        where: { userName },
      });
      return userData ? new User(userData) : undefined;
    } catch (error) {
      console.error('Error fetching user by name:', error);
    }
  }

  public async getAll(): Promise<User[]> {
    try {
      const usersData = await prisma.user.findMany();
      return usersData.map((userData) => new User({ ...userData }));
    } catch (error) {
      console.error('Error fetching all users:', error);
      return [];
    }
  }

  public async updateBalance(user: User): Promise<User | void> {
    const userName = user.userName;
    try {
      const result = await prisma.$transaction([
        prisma.$executeRaw`SELECT * FROM users WHERE userName = ${userName} FOR UPDATE`,
        prisma.user.update({
          where: { userName: userName },
          data: { balance: user.balance },
        }),
      ]);

      // Return the updated user.
      return result[1];
    } catch (error) {
      console.error('Error updating user balance:', error);
      return;
    }
  }

  public async clear(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
