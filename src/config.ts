import { Dialect } from "sequelize";

export const NODE_ENV = "development";

export const DB_CONFIG = {
  DB: "hiraya",
  USER: "root",
  HOST: "localhost",
  DIALECT: "mysql" as Dialect,
  PASSWORD: "",
};
