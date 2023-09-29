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
    "users.json"
  );

  constructor() {
    fs.readFile(this.filePath, (error) => {
      console.error(`Error reading the file ${this.filePath}:`, error)
    })
  }

  private async saveToFile(users: User[]) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(users));
    } catch (error) {
      console.error(`Error writing to file ${this.filePath}:`, error); // Log any errors during the write operation
    }
  }

  public clear(): void {
    this.saveToFile([])
  }

  public async insert(user: User): Promise<void> {
    const users = await this.getUsersFromFile();
    users.push(user);
    await this.saveToFile(users);
  }

  public async updateBalance(user: User): Promise<User | void> {
    const users = await this.getUsersFromFile();
    users.forEach((oldUser) => {
      if (oldUser.userName == user.userName) {
        oldUser.balance = user.balance;
      }
    })

    await this.saveToFile(users);
    return await this.getByName(user.userName);
  }

  public async getAll(): Promise<User[]> {
    const users = await this.getUsersFromFile();
    return [...users];
  }

  public async getByName(userName: string): Promise<User | undefined> {
    const users = await this.getUsersFromFile();
    return users.find((user) => user.userName == userName);
  }

  public async getUsersFromFile(): Promise<User[]> {
    let users: User[] = [];
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      if (data) {
        users = await JSON.parse(data);
      } else {
        console.error(`File ${this.filePath} is empty.`);
      }
    } catch (error) {
      console.error(`Error reading or parsing file ${this.filePath}:`, error);
    }

    return users.map((user) => new User({ ...user }));
  }
}
