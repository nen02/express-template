import { Request, Response } from "express";
import { UserService } from "src/services";
import { AuthRequest } from "src/types";

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req: AuthRequest, res: Response) {
    const users = await this.userService.getAllUsers();

    return res.json({ users });
  }

  async getUserByID(req: Request<{ userId: number }>, res: Response) {
    const userId = req.params.userId;
    const user = await this.userService.getUserById(userId);

    if (!user) return res.sendStatus(404);

    return res.json({ user: user });
  }

  async getUserByUUID(req: Request<{ uuid: string }>, res: Response) {
    const uuid = req.params.uuid;
    const user = await this.userService.getUserByUUID(uuid);

    if (!user) return res.sendStatus(404);

    return res.json({ user: user });
  }
}

export default UserController;
