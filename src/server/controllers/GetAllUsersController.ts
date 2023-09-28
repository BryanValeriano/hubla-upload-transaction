import User from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";
import GetUsersService from "../useCases/getUsers/getUsersService";

type GetAllUsersControllerProps = {
  userRepository: IUserRepository;
}
export default class GetAllUsersController {
  private userRepository: IUserRepository;
  private getUsersService: GetUsersService;

  constructor({ userRepository }: GetAllUsersControllerProps) {
    this.userRepository = userRepository;
    this.getUsersService = new GetUsersService({
      userRepository: this.userRepository
    });

  }

  public execute(): User[] {
    return this.getUsersService.execute();
  }
}
