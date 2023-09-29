import User from "@/server/entities/User";
import IUserRepository from "@/server/repositories/IUserRepository";
import GetUserByNameService from "../getUserByName/getUserByNameService";

type Dependencies = {
  userRepository: IUserRepository;
}

export default class UpdateUserBalanceService {
  private userRepository: IUserRepository;
  private getUserByNameService: GetUserByNameService;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
    this.getUserByNameService = new GetUserByNameService({ userRepository });
  }

  public async execute(user: User): Promise<User | undefined> {
    const existingUser = await this.getUserByNameService.execute(user.userName);

    if (!existingUser) {
      console.error("Error on updating non existing user");
      return;
    }

    const updatedUser = await this.userRepository.updateBalance(user);
    return user;
  }
}
