import User from "../entities/User"

export default interface IUserRepository {
  insert(user: User): Promise<void>
  getByName(userName: string): Promise<User | undefined>
  getAll(): Promise<User[]>
  updateBalance(user: User): Promise<User | void>
}

