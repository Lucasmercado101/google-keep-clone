import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db/index";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passportConfig";
import bodyParser from "body-parser";

const {
  PORT = 5000,
  FRONT_WEBSITE_URL,
  SESSION_SECRET = "devTesting"
} = process.env;

const server = express();

// TODO: at the end...
// - collaborations in real time with https://socket.io/
// - reminders

// ---- MIDDLEWARE --------

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors({ origin: FRONT_WEBSITE_URL, credentials: true }));
server.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
server.use(passport.initialize());
server.use(passport.session());
passportConfig(passport);

// ------------------------

server.use("/", routes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sequelize connected successfully");
  })
  .catch((e) => console.error("Error when starting DB: ", e));

server.listen(PORT, () => {
  console.log("Server successfully started on port:", PORT);
});
