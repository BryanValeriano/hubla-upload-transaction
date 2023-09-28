import User from "@/server/entities/User";
import IUserRepository from "@/server/repositories/IUserRepository";
import GetUserByNameService from "../getUserByName/getUserByNameService";

type Input = Omit<User, 'balance'>

type Dependencies = {
  userRepository: IUserRepository;
}

export default class CreateUserService {
  private userRepository: IUserRepository;
  private getUserByNameService: GetUserByNameService;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
    this.getUserByNameService = new GetUserByNameService({
      userRepository
    });
  }

  async execute({ userName }: Input): Promise<User> {
    const existingUser = await this.getUserByNameService.execute(userName)

    if (existingUser) {
      return existingUser;
    }

    const user = new User({
      balance: 0,
      userName
    })

    await this.userRepository.insert(user);
    return user;
  }
}
