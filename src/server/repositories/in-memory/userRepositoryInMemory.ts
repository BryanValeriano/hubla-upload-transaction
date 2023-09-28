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
        return oldUser;
      }
    })
  }

  async getByName(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName == userName);
  }
}
