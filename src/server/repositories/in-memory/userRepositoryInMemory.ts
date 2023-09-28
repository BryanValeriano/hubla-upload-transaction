import User from "@/server/entities/User";
import IUserRepository from "../IUserRepository";

export default class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  insert(User: User): void {
    this.users.push(User);
  }

  updateBalance(user: User): User | void {
    this.users.forEach((oldUser) => {
      if (oldUser.userName == user.userName) {
        oldUser.balance = user.balance;
        return oldUser;
      }
    })
  }

  getAll(): User[] {
    return [...this.users];
  }

  getByName(userName: string): User | undefined {
    return this.users.find((user) => user.userName == userName);
  }
}
