import { Router } from "express";
import { UserController } from "src/controllers";

class UserRouter {
  private readonly router;

  constructor() {
    const userController = new UserController();

    this.router = Router();
    this.router.get("/", userController.getUsers.bind(userController));
    this.router.get(
      "/:uuid",
      userController.getUserByUUID.bind(userController)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
