import { Sequelize } from "sequelize-typescript";

const { DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  models: [__dirname + "/models"],
  logging: false
});

export default sequelize;
