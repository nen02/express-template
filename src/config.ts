import { Dialect } from "sequelize";

export const NODE_ENV = "development";

export const DB_CONFIG = {
  DB: "hris",
  USER: "postgres",
  HOST: "localhost",
  DIALECT: "postgres" as Dialect,
  PASSWORD: "1234",
};

// TODO: use proper secret key
export const SECRET_KEY =
  "6fde0a6d2c46e96ab9977f234630d7b81ad1617f475c8e5cef2497692d4fe6b3";
