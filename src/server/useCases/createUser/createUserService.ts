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

  public execute({ userName }: Input): User {
    const existingUser = this.getUserByNameService.execute(userName)

    console.log(userName, " existingUser: ", existingUser);

    if (existingUser) {
      return existingUser;
    }

    const user = new User({
      balance: 0,
      userName
    })

    this.userRepository.insert(user);
    return user;
  }
}
