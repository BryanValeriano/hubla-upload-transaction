import User from "../entities/User"

export default interface IUserRepository {
  insert(user: User): void
  getByName(userName: string): User | undefined
  getAll(): User[]
  updateBalance(user: User): User | void
}

