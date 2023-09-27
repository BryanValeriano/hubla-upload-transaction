import User from "@/server/entities/User";
import IUserRepository from "@/server/repositories/IUserRepository";

type Input = Omit<User, 'balance'>

type Dependencies = {
  userRepository: IUserRepository;
}

export default class CreateUserService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute({ userName }: Input) {
    const user = new User({
      balance: 0,
      userName
    })

    await this.userRepository.insert(user);
    return user;
  }
}
