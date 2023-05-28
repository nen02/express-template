import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./config";

class Database {
  private sqlConnection;

  constructor() {
    // Create an SQL connection
    this.sqlConnection = new Sequelize(
      DB_CONFIG.DB,
      DB_CONFIG.USER,
      DB_CONFIG.PASSWORD,
      {
        host: DB_CONFIG.HOST,
        dialect: DB_CONFIG.DIALECT,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        logging: false,
      }
    );
  }

  connection() {
    return this.sqlConnection;
  }
}

export default new Database();
