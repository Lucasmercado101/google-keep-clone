import { Router } from "express";
import Note from "../db/models/Note";
import { Op } from "sequelize";
const router = Router();
import isAuthenticated from "./middleware/isAuthenticated";

router.use("/", isAuthenticated);

router.get("/", (req, res) => {
  Note.findAll({
    where: { author: req.user!.userName },
    attributes: ["title", "content", "id", "pinned", "archived"]
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
    content,
    pinned: false,
    archived: false
  });
  // if (labels) (await newNote).$set("labels", labels); TODO: check if labels exist
  // Add collaborators
  res.json({
    author: newNote.author,
    title: newNote.title,
    content: newNote.content,
    pinned: newNote.pinned,
    archived: newNote.archived
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Note.destroy({ where: { id } });
  res.sendStatus(200);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, labels, pinned, archived } = req.body;
  const [_, [updatedNote]] = await Note.update(
    { title, content, pinned, archived },
    { where: { id }, returning: true }
  );
  //TODO: update labels, collaborators, etc
  res.json({
    author: updatedNote.author,
    title: updatedNote.title,
    content: updatedNote.content,
    pinned: updatedNote.pinned,
    archived: updatedNote.archived
  });
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
    attributes: ["id", "title", "content", "pinned", "archived"]
  }).then((notes) => res.json(notes));
  // TODO: pagination
});

export default router;
