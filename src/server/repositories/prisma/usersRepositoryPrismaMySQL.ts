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
    const lockName = 'updateBalanceLock';

    await this.ensureLockExists(lockName); // Ensure the lock exists before trying to acquire it

    if (!(await this.acquireLock(lockName))) return;

    try {
      const updatedUserData = await prisma.user.update({
        where: { userName: user.userName },
        data: { balance: user.balance },
      });
      return new User(updatedUserData);
    } catch (error) {
      console.error('Error updating user balance:', error);
    } finally {
      await this.releaseLock(lockName);
    }
  }

  private async ensureLockExists(lockName: string): Promise<void> {
    try {
      const existingLock = await prisma.lock.findUnique({ where: { name: lockName } });
      if (!existingLock) {
        await prisma.lock.create({ data: { name: lockName, locked: false } });
        console.log(`Lock ${lockName} created.`);
      }
    } catch (error) {
      console.error(`Error ensuring lock ${lockName} exists:`, error);
    }
  }

  private async acquireLock(lockName: string, retryCount: number = 5): Promise<boolean> {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < retryCount; i++) {
      try {
        const result = await prisma.lock.updateMany({
          where: {
            name: lockName,
            locked: false,
          },
          data: {
            locked: true,
          },
        });

        // If lock acquired, return true
        if (result.count > 0) return true;

      } catch (error) {
        console.error('Error acquiring lock:', error);
        // If there is an error acquiring lock, it’s better to return and not proceed with retries
        return false;
      }

      // If lock not acquired, wait for some time before retrying
      await delay(1000); // 1 second delay before retrying
    }

    // If the code reaches here, it means lock couldn’t be acquired after all retries
    return false;
  }

  private async releaseLock(lockName: string): Promise<void> {
    try {
      await prisma.lock.updateMany({
        where: { name: lockName },
        data: { locked: false },
      });
    } catch (error) {
      console.error('Error releasing lock:', error);
    }
  }
}
