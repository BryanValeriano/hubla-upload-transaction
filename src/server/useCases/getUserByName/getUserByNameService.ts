import User from "@/server/entities/User";
import IUserRepository from "@/server/repositories/IUserRepository";

type Input = Omit<User, 'balance'>

type Dependencies = {
  UserRepository: IUserRepository;
}

export default class GetUsersService {
  private UserRepository: IUserRepository;

  constructor({ UserRepository }: Dependencies) {
    this.UserRepository = UserRepository;
  }

  async execute({ userName }: Input) {
    const user = await this.UserRepository.getByName(userName);
    return user;
  }
}
