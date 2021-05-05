import { Router } from "express";
import Note from "../../db/models/Note";
import Label from "../../db/models/Label";
import { Op } from "sequelize";

const ROUTE = "/notes";

export default Router({ mergeParams: true }).post(ROUTE, async (req, res) => {
  const {
    title,
    content,
    labels,
    pinned = false,
    archived = false,
    color
  } = req.body;

  if (!content && !title) return res.sendStatus(400);

  const newNote = await Note.create({
    author: req.user!.userName,
    title,
    content,
    pinned: archived ? false : pinned,
    archived,
    color
  });

  if (labels) {
    const userLabels = await Label.findAll({
      where: {
        id: { [Op.in]: labels }
      }
    });
    (await newNote).$set("labels", userLabels);
  }
  // Add collaborators

  res.json({
    author: newNote.author,
    title: newNote.title,
    content: newNote.content,
    pinned: newNote.pinned,
    archived: newNote.archived,
    color: newNote.color
  });
});
