import IUserRepository from "@/server/repositories/IUserRepository";

type Dependencies = {
  userRepository: IUserRepository;
}

export default class GetUsersService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute() {
    const Users = await this.userRepository.getAll();
    return Users;
  }
}
