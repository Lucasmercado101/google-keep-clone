import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";

const {
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  DATABASE_URL,
  NODE_ENV
} = process.env;

let sequelize: Sequelize;

if (NODE_ENV !== "production") {
  sequelize = new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    models: [__dirname + "/models"],
    logging: false
  });
} else {
  sequelize = new Sequelize(DATABASE_URL!, {
    dialect: "postgres",
    models: [__dirname + "/models"],
    logging: false
  });
}

export default sequelize;
