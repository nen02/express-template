import { Router } from "express";
import { UserController } from "src/controllers";

class UserRouter {
  private readonly router;

  constructor() {
    this.router = Router();

    const userController = new UserController();

    this.router.get("/", userController.getUsers.bind(userController));
    this.router.get(
      "/:userId",
      userController.getUserByID.bind(userController)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
