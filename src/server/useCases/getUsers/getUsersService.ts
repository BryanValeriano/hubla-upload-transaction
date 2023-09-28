import IUserRepository from "@/server/repositories/IUserRepository";

type Dependencies = {
  userRepository: IUserRepository;
}

export default class GetUsersService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public execute() {
    const Users = this.userRepository.getAll();
    return Users;
  }
}
