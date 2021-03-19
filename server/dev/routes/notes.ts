import { Router } from "express";
import Note from "../db/models/Note";
import { Op } from "sequelize";
const router = Router();
import isAuthenticated from "./middleware/isAuthenticated";

router.use("/", isAuthenticated);

router.get("/", (req, res) => {
  Note.findAll({
    where: { author: req.user!.userName },
    attributes: ["title", "content", "id"]
    // TODO: get collaborators, labels, etc.
  })
    .then((resp) => res.json(resp))
    .catch((e) => res.sendStatus(500));
});

router.post("/", async (req, res) => {
  const { title, content, labels } = req.body;

  if (!content) return res.sendStatus(400);

  const newNote = await Note.create({
    author: req.user!.userName,
    title,
    content
  });
  // if (labels) (await newNote).$set("labels", labels); TODO: check if labels exist
  // Add collaborators
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Note.destroy({ where: { id } });
  res.sendStatus(200);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, labels } = req.body;
  await Note.update({ title, content }, { where: { id } });
  //TODO: update labels, collaborators, etc
  res.sendStatus(200);
});

router.get("/search", async (req, res) => {
  const { searchTerm, limit = 30 } = req.query;

  await Note.findAll({
    where: {
      [Op.or]: {
        title: { [Op.iLike]: `%${searchTerm}%` },
        content: { [Op.iLike]: `%${searchTerm}%` }
      }
    },
    limit: +limit,
    attributes: ["id", "title", "content"]
  }).then((notes) => res.json(notes));
  // TODO: pagination
});

export default router;
