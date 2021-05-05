import { Router } from "express";
import Note from "../../../db/models/Note";
import isAuthenticated from "../../middleware/isAuthenticated";
import isParamANumber from "../../middleware/isParamANumber";

const ROUTE = "/notes/:noteId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isAuthenticated,
  isParamANumber("noteId"),
  async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findByPk(noteId);
    if (!note) return res.sendStatus(404);
    await note.destroy();
    res.sendStatus(200);
  }
);
