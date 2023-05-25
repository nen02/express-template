import { IRepository } from "../types";
import { User, UserInput, UserOutput } from "src/models";

const USER_PUBLIC_ATTRIB = [
  "uuid",
  "username",
  "firstName",
  "lastName",
  "email",
];

class UserRepository implements IRepository<UserInput, UserOutput> {
  async create(payload: UserInput): Promise<UserOutput> {
    const { username, email, password, firstName, lastName } = payload;

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    return user;
  }

  async update(id: number, payload: Partial<UserInput>): Promise<UserOutput> {
    const user = await User.findByPk(id);

    const updatedUser = await (user as User).update(payload);
    return updatedUser;
  }

  async getById(id: number): Promise<UserOutput | null> {
    const user = await User.findByPk(id, {
      attributes: USER_PUBLIC_ATTRIB,
    });

    return user || null;
  }

  async getByUUID(uuid: string): Promise<UserOutput | null> {
    const user = await User.findOne({
      where: { uuid },
      attributes: USER_PUBLIC_ATTRIB,
    });

    return user || null;
  }

  async getByUsername(username: string): Promise<UserOutput | null> {
    const user = await User.findOne({ where: { username } });

    return user || null;
  }

  async getByEmail(email: string): Promise<UserOutput | null> {
    const user = await User.findOne({ where: { email } });

    return user || null;
  }

  async deleteById(id: number): Promise<boolean> {
    const deletedUserCount = await User.destroy({
      where: { id },
    });

    return !!deletedUserCount;
  }

  async all(): Promise<UserOutput[]> {
    return User.findAll({
      attributes: USER_PUBLIC_ATTRIB,
    });
  }
}

export default UserRepository;
