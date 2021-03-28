import dotenv from "dotenv";
dotenv.config();
import sequelize from "./db/index";
import server from "./server";

const { PORT = 5000 } = process.env;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sequelize connected successfully");
  })
  .catch((e) => console.error("Error when starting DB: ", e));

server.listen(PORT, () => {
  console.log("Server successfully started on port:", PORT);
});
