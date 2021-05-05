import { Router } from "express";
import Note from "../../../db/models/Note";

const ROUTE = "/notes/:noteId";

export default Router({ mergeParams: true }).delete(ROUTE, async (req, res) => {
  const { noteId } = req.params;
  await Note.destroy({ where: { id: noteId, author: req.user!.userName } });
  res.sendStatus(200);
});
