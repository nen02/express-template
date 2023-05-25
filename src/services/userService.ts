import { UserInput, UserOutput } from "../models/userModel";
import { UserRepository } from "src/repositories";

class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.getByUsername(username);

    return Boolean(user);
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(email);

    return Boolean(user);
  }

  createUser(user: UserInput): Promise<UserOutput> {
    return this.userRepository.create(user);
  }

  getUserById(id: number): Promise<UserOutput | null> {
    return this.userRepository.getById(id) || null;
  }

  getUserByUUID(uuid: string): Promise<UserOutput | null> {
    return this.userRepository.getByUUID(uuid) || null;
  }

  getAllUsers(): Promise<UserOutput[]> {
    return this.userRepository.all();
  }
}

export default UserService;
