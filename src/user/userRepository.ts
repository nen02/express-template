import { IRepository } from "../types";
import User, { UserInput, UserOutput } from "./userModel";

class UserRepository implements IRepository<UserInput, UserOutput> {
  async create(payload: UserInput): Promise<UserOutput> {
    const user = await User.create(payload);
    return user;
  }

  async update(id: number, payload: Partial<UserInput>): Promise<UserOutput> {
    const user = await User.findByPk(id);

    const updatedUser = await (user as User).update(payload);
    return updatedUser;
  }

  async getById(id: number): Promise<UserOutput | null> {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return user;
  }

  async deleteById(id: number): Promise<boolean> {
    const deletedUserCount = await User.destroy({
      where: { id },
    });

    return !!deletedUserCount;
  }

  async all(): Promise<UserOutput[]> {
    return User.findAll();
  }
}

export default UserRepository;
