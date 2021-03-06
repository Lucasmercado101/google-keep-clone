import { Router } from "express";
import Note from "../db/models/Note";
import { Op } from "sequelize";
const router = Router();
import isAuthenticated from "./middleware/isAuthenticated";
import Label from "../db/models/Label";

router.use("/", isAuthenticated);

const noteAttributesToReturn = [
  "title",
  "content",
  "id",
  "pinned",
  "archived",
  "color"
];

router.get("/", (req, res) => {
  Note.findAll({
    where: { author: req.user!.userName },
    attributes: noteAttributesToReturn,
    include: [
      { model: Label, attributes: ["name", "id"], through: { attributes: [] } }
    ],
    order: [["id", "ASC"]]
    // TODO: get collaborators, labels, etc.
  })
    .then((resp) => {
      const normalNotes = resp.filter((note) => !note.archived && !note.pinned);
      const pinnedNotes = resp.filter((note) => !note.archived && note.pinned);
      const archivedNotes = resp.filter(
        (note) => note.archived && !note.pinned
      );

      res.json({
        pinned: pinnedNotes,
        archived: archivedNotes,
        other: normalNotes
      });
    })
    .catch((e) => res.sendStatus(500));
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { labels, ...otherData } = req.body as any;
  const note = await Note.findOne({
    where: { id, author: req.user!.userName },
    attributes: noteAttributesToReturn
  });

  if (!note) return res.sendStatus(404);

  if (otherData && Object.keys(otherData).length)
    await note.update(
      otherData,
      {
        where: { id, author: req.user!.userName }
      },
      {
        fields: ["title", "content", "pinned", "archived", "color"]
      }
    );

  if (labels) {
    const userLabels = await Label.findAll({
      where: { id: { [Op.in]: labels }, owner: req.user!.userName }
    });
    await note.$set("labels", userLabels);
  }

  //TODO: collaborators, etc
  res.json({
    ...note.toJSON(),
    labels: await note.$get("labels", {
      attributes: ["id", "name"],
      //@ts-ignore
      joinTableAttributes: []
    })
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
    attributes: noteAttributesToReturn
  }).then((notes) => res.json(notes));
  // TODO: pagination
});

router.delete("/label", async (req, res) => {
  const { labelId, noteId } = req.body;
  const note = await Note.findOne({
    where: { id: noteId, author: req.user!.userName },
    attributes: noteAttributesToReturn
  });

  await note?.$remove("label", labelId);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Note.destroy({ where: { id, author: req.user!.userName } });
  res.sendStatus(200);
});

export default router;
