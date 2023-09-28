import User from "@/server/entities/User";
import IUserRepository from "../IUserRepository";
import fs from "fs";
import path from "node:path";

export default class UserRepositoryJSON implements IUserRepository {
  private filePath = path.join(
    'src',
    'server',
    'repositories',
    'json',
    'files',
    "Users.json"
  );

  constructor() {
    fs.readFile(this.filePath, (err) => {
      console.error("Error on loading JSON database", err)
    })
  }

  private async saveToFile(Users: User[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(Users));
  }

  async clear(): Promise<void> {
    await this.saveToFile([])
  }

  async insert(user: User): Promise<void> {
    const users = this.getUsersFromFile();
    users.push(user);
    this.saveToFile(users);
  }

  async updateBalance(user: User): Promise<User | void> {
    const users = this.getUsersFromFile();
    users.forEach((oldUser) => {
      if (oldUser.userName == user.userName) {
        oldUser.balance = user.balance;
        return oldUser;
      }
    })
    this.saveToFile(users);
  }

  async getByName(userName: string): Promise<User | undefined> {
    const users = this.getUsersFromFile();
    return users.find((user) => user.userName == userName);
  }

  private getUsersFromFile(): User[] {
    const Users: User[] = JSON.parse(fs.readFileSync(
      this.filePath,
      'utf8',
    ));

    return Users.map((user) => new User({ ...user }));
  }
}
