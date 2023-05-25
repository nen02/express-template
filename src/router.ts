import { Router as ExpressRouter } from "express";
import { UserRouter } from "./routers";

class Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
    this.router.use("/users", new UserRouter().getRouter());
  }

  routes() {
    return this.router;
  }
}

export default Router;
