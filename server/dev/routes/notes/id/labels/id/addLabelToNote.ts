import { Router } from "express";
import Note from "../../../../../db/models/Note";
import Label from "../../../../../db/models/Label";
import isAuthenticated from "../../../../middleware/isAuthenticated";
import isParamANumber from "../../../../middleware/isParamANumber";

const ROUTE = "/notes/:noteId/labels/:labelId";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isAuthenticated,
  isParamANumber("noteId"),
  isParamANumber("labelId"),
  async (req, res) => {
    const { labelId, noteId } = req.params;
    const note = await Note.findByPk(noteId);
    if (!note) return res.status(404).send("Note does not exist");
    const label = await Label.scope({
      method: ["userLabel", req.user!.userName]
    }).findByPk(labelId);
    if (!label) return res.status(404).send("Label does not exist");
    await note.$add("label", label); // Does nothing if it was already added
    res.json(await note.$get("labels", <any>{ joinTableAttributes: [] }));
  }
);
