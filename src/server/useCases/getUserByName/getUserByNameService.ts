import User from "@/server/entities/User";
import IUserRepository from "@/server/repositories/IUserRepository";

type Input = Omit<User, 'balance'>

type Dependencies = {
  userRepository: IUserRepository;
}

export default class GetUserByNameService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute(userName: string) {
    const user = await this.userRepository.getByName(userName);
    return user;
  }
}
