import { Router } from "express";
import { AuthController } from "src/controllers";

class AuthRouter {
  private readonly router;

  constructor() {
    this.router = Router();

    const authController = new AuthController();

    this.router.post("/register", authController.register.bind(authController));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default AuthRouter;
