import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db/index";

const { PORT = 5000, FRONT_WEBSITE_URL } = process.env;

const server = express();

// TODO: at the end...
// - collaborations in real time with https://socket.io/
// - reminders

// ---- MIDDLEWARE --------

server.use(morgan("tiny"));
server.use(cors({ origin: FRONT_WEBSITE_URL }));

// ------------------------

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Sequelize connected successfully");
  })
  .catch((e) => console.error("Error when starting DB: ", e));

server.listen(PORT, () => {
  console.log("Server successfully started on port:", PORT);
});
