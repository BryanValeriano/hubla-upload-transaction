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

  public execute(userName: string) {
    console.log(this.userRepository);
    const user = this.userRepository.getByName(userName);
    return user;
  }
}
