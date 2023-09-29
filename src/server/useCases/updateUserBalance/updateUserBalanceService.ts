import User from "@/server/entities/User";
import IUserRepository from "@/server/repositories/IUserRepository";

type Dependencies = {
  userRepository: IUserRepository;
}

export default class UpdateUserBalanceService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public async execute(user: User): Promise<User | undefined> {
    const existingUser = await this.userRepository.getByName(user.userName)

    if (!existingUser) {
      console.error("Error on updatng non existing user");
      return;
    }

    await this.userRepository.updateBalance(user);
    return user;
  }
}
