import { Request, Response } from "express";
import UserService from "./userService";

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();

    return res.json({ users });
  }

  async getUserByID(req: Request<{ userId: number }>, res: Response) {
    const userId = req.params.userId;
    const user = await this.userService.getUserById(userId);

    if (!user) return res.sendStatus(404);

    return res.json({ user: user });
  }
}

export default UserController;
