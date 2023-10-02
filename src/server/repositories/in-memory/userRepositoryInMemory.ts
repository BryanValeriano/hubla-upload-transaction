import User from "@/server/entities/User";
import IUserRepository from "../IUserRepository";

export default class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async insert(User: User): Promise<void> {
    this.users.push(User);
  }

  async updateBalance(user: User): Promise<User | void> {
    this.users.forEach((oldUser) => {
      if (oldUser.userName == user.userName) {
        oldUser.balance = user.balance;
      }
    })
    return await this.getByName(user.userName);
  }

  async getAll(): Promise<User[]> {
    return [...this.users];
  }

  async getByName(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName == userName);
  }

  public async clear(): Promise<void> {
    this.users = [];
  }
}
