import { Dialect } from "sequelize";

export const NODE_ENV = "development";

export const DB_CONFIG = {
  DB: "hris",
  USER: "postgres",
  HOST: "localhost",
  DIALECT: "postgres" as Dialect,
  PASSWORD: "1234",
};
