import { Router } from "express";
import Note from "../../../db/models/Note";
import isAuthenticated from "../../middleware/isAuthenticated";

const ROUTE = "/notes/:noteId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { noteId } = req.params;
    await Note.destroy({ where: { id: noteId, author: req.user!.userName } });
    res.sendStatus(200);
  }
);
