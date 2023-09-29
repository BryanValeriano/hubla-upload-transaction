import User from "@/server/entities/User";
import IUserRepository from "../IUserRepository";
import fs from "fs";
import path from "path"; // changed from node:path

export default class UserRepositoryJSON implements IUserRepository {
  private db: User[] = [];
  private filePath = path.join(
    'src',
    'server',
    'repositories',
    'json',
    'files',
    "users.json"
  );

  constructor() {
    this.getUsersFromFile();
  }

  private async saveToFile(users: User[]) {
    this.db = users; // Update the db variable
    fs.writeFile(this.filePath, JSON.stringify(users), (error) => {
      if (error) console.error(`Error writing to file ${this.filePath}:`, error);
    });
  }

  public clear(): void {
    this.saveToFile([]);
  }

  public async insert(user: User): Promise<void> {
    this.db.push(user);
    await this.saveToFile(this.db);
  }

  public async updateBalance(user: User): Promise<User | void> {
    const userIndex = this.db.findIndex(oldUser => oldUser.userName === user.userName);
    if (userIndex !== -1) {
      this.db[userIndex].balance = user.balance;
      await this.saveToFile(this.db);
    }
    return this.getByName(user.userName);
  }

  public async getAll(): Promise<User[]> {
    return [...this.db];
  }

  public async getByName(userName: string): Promise<User | undefined> {
    return this.db.find(user => user.userName === userName);
  }

  public async getUsersFromFile(): Promise<User[]> {
    fs.readFile(this.filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(`Error reading file ${this.filePath}:`, error);
        return;
      }

      try {
        this.db = JSON.parse(data).map((user: User) => new User({ ...user }));
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    });

    return this.db;
  }
}
