import { Router } from "express";
import isAuthenticated from "../../../../middleware/isAuthenticated";

const ROUTE = "/notes/:noteId/labels/:labelId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { labelId, noteId } = req.params;
    const [note] = await req.user!.$get("notes", { where: { id: noteId } });
    if (!note) return res.status(404).send("Note does not exist");
    const [label] = await note.$get("labels", { where: { id: labelId } });
    if (!label) return res.status(404).send("Note does not have that label");
    await note.$remove("label", labelId);
    res.sendStatus(200);
  }
);
