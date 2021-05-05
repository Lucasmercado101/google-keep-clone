import { Router } from "express";
import Note from "../../../../../db/models/Note";
import isAuthenticated from "../../../../middleware/isAuthenticated";

const noteAttributesToReturn = [
  "title",
  "content",
  "id",
  "pinned",
  "archived",
  "color"
];

const ROUTE = "/notes/:noteId/labels/:labelId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { labelId, noteId } = req.params;
    const note = await Note.findByPk(noteId);
    if (!note) return res.status(404).send("Note does not exist");
    if (!(await note.$get("labels")).find((label) => label.id === +labelId))
      return res.status(404).send("Note does not have that label");
    await note.$remove("label", labelId);
    res.sendStatus(200);
  }
);
