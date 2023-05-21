import { UserOutput } from "./userModel";
import UserRepository from "./userRepository";

class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById(id: number): Promise<UserOutput | null> {
    return this.userRepository.getById(id);
  }

  getAllUsers(): Promise<UserOutput[]> {
    return this.userRepository.all();
  }
}

export default UserService;
