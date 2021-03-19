import { Router } from "express";
import Note from "../db/models/Note";
import User from "../db/models/User";
const router = Router();
import isAuthenticated from "./middleware/isAuthenticated";

router.use("/", isAuthenticated);

router.get("/", (req, res) => {
  Note.findAll({
    where: { author: req.user!.userName },
    attributes: ["title", "content", "id"]
  })
    .then((resp) => {
      console.log(resp);
      res.json(resp);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

export default router;
