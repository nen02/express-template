import { Router as ExpressRouter } from "express";
import { UserRouter, AuthRouter } from "./routers";
import { LoggedInMiddleware } from "./middlewares";

class Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();

    const loggedInMiddleware = new LoggedInMiddleware();

    this.router.use("/", new AuthRouter().getRouter());

    this.router.use(
      "/users",
      loggedInMiddleware.authenticate,
      new UserRouter().getRouter()
    );

    this.router.use((_, res) => {
      res.status(404).json({ error: "Not found" });
    });
  }

  routes() {
    return this.router;
  }
}

export default Router;
