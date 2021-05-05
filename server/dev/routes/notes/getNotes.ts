import { Router } from "express";
import Note from "../../db/models/Note";
import Label from "../../db/models/Label";

const ROUTE = "/notes";

const noteAttributesToReturn = [
  "title",
  "content",
  "id",
  "pinned",
  "archived",
  "color"
];

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
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
