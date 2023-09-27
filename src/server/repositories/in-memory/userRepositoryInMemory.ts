import User from "@/server/entities/User";
import IUserRepository from "../IUserRepository";

export default class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async insert(User: User): Promise<void> {
    this.users.push(User);
  }

  async getByName(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName == userName);
  }
}
