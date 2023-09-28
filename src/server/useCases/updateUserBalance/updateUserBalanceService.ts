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

  public execute(user: User): User | undefined {
    const existingUser = this.userRepository.getByName(user.userName)

    if (!existingUser) {
      console.error("Error on updatng non existing user");
      return;
    }

    this.userRepository.updateBalance(user);
    return user;
  }
}
