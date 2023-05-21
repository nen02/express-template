import express, { Application } from "express";
import helmet from "helmet";
import Router from "./router";
import { User } from "./user";
import { NODE_ENV } from "./config";

class App {
  private server: Application;

  constructor() {
    this.server = express();

    // Server configuration
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(helmet());

    // Register routes
    this.server.use("/api/v1", new Router().routes());
  }

  startServer() {
    try {
      User.sync({ alter: NODE_ENV === "development" });

      this.server.listen(8001, () => {
        console.log("Server running at http://localhost:8001");
      });
    } catch (error) {
      console.log("Failed to start the server");
    }
  }
}

export default App;
