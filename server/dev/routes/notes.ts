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

router.post("/", async (req, res) => {
  const { title, content, labels } = req.body;

  if (!content) return res.sendStatus(400);

  const newNote = Note.create({ author: req.user!.userName, title, content });
  if (labels) (await newNote).$set("labels", labels);
  res.sendStatus(200);
});

export default router;
