import { UserInput, UserOutput } from "../models/userModel";
import { UserRepository } from "src/repositories";

class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);

    return Boolean(user);
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.getByField("email", email);

    return Boolean(user);
  }

  createUser(user: UserInput): Promise<UserOutput> {
    return this.userRepository.create(user);
  }

  getUserById(id: number): Promise<UserOutput | null> {
    return this.userRepository.getById(id) || null;
  }

  getUserByUUID(uuid: string): Promise<UserOutput | null> {
    return this.userRepository.getByField("uuid", uuid) || null;
  }

  getUserByUsername(
    username: string,
    extraFields: string[] = []
  ): Promise<UserOutput | null> {
    return (
      this.userRepository.getByField("username", username, extraFields) || null
    );
  }

  getAllUsers(): Promise<UserOutput[]> {
    return this.userRepository.all();
  }
}

export default UserService;
