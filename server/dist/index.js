"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./db/index"));
var _a = process.env, _b = _a.PORT, PORT = _b === void 0 ? 5000 : _b, FRONT_WEBSITE_URL = _a.FRONT_WEBSITE_URL;
var server = express_1.default();
// TODO: at the end...
// - collaborations in real time with https://socket.io/
// - reminders
// ---- MIDDLEWARE --------
server.use(morgan_1.default("tiny"));
server.use(cors_1.default({ origin: FRONT_WEBSITE_URL }));
// ------------------------
index_1.default
    .sync({ force: true })
    .then(function () {
    console.log("Sequelize connected successfully");
})
    .catch(function (e) { return console.error("Error when starting DB: ", e); });
server.listen(PORT, function () {
    console.log("Server successfully started on port:", PORT);
});
