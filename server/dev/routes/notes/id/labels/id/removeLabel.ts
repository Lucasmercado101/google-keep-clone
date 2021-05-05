import { Router } from "express";
import Note from "../../../../../db/models/Note";

const noteAttributesToReturn = [
  "title",
  "content",
  "id",
  "pinned",
  "archived",
  "color"
];

const ROUTE = "/notes/:noteId/labels/:labelId";

export default Router({ mergeParams: true }).delete(ROUTE, async (req, res) => {
  const { labelId, noteId } = req.params;
  const note = await Note.findOne({
    where: { id: noteId, author: req.user!.userName },
    attributes: noteAttributesToReturn
  });

  await note?.$remove("label", labelId);
  res.sendStatus(200);
});
