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
    try {
      const updatedUserData = await prisma.user.update({
        where: { userName: user.userName },
        data: { balance: user.balance },
      });
      return new User(updatedUserData);
    } catch (error) {
      console.error('Error updating user balance:', error);
    }
  }
}
