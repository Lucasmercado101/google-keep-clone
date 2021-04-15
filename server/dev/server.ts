import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passportConfig";
import bodyParser from "body-parser";

const {
  FRONT_WEBSITE_URL,
  SESSION_SECRET = "devTesting",
  NODE_ENV
} = process.env;

const server = express();

// TODO: at the end...
// - collaborations (in real time with https://socket.io/ ?)
// - reminders

// ---- MIDDLEWARE --------

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
  cors({
    origin: (origin, callback) => {
      if (NODE_ENV !== "production") return callback(null, true);
      else if (FRONT_WEBSITE_URL === origin) return callback(null, true);

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

if (NODE_ENV === "production") {
  server.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: { sameSite: "none", httpOnly: false, secure: true }
    })
  );
} else {
  server.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
}

server.use(passport.initialize());
server.use(passport.session());
passportConfig(passport);

// ------------------------

server.use("/", routes);

export default server;
