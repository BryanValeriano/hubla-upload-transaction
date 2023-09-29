import IUserRepository from "@/server/repositories/IUserRepository";
import { User } from "@prisma/client";

type Dependencies = {
  userRepository: IUserRepository;
}

export default class GetUsersService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    return users;
  }
}
