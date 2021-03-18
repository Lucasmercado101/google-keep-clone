"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var _a = process.env, DB_NAME = _a.DB_NAME, DB_PASSWORD = _a.DB_PASSWORD, DB_USERNAME = _a.DB_USERNAME;
var sequelize = new sequelize_typescript_1.Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    models: [__dirname + "/models"],
    logging: false
});
exports.default = sequelize;
