import { Router } from "express";
import Note from "../../../db/models/Note";
import Label from "../../../db/models/Label";
import { Op } from "sequelize";
import isAuthenticated from "../../middleware/isAuthenticated";

const ROUTE = "/notes/:noteId";

const noteAttributesToReturn = [
  "title",
  "content",
  "id",
  "pinned",
  "archived",
  "color"
];

export default Router({ mergeParams: true }).put(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { noteId } = req.params;
    const { labels, ...otherData } = req.body as any;
    const note = await Note.findOne({
      where: { id: noteId, author: req.user!.userName },
      attributes: noteAttributesToReturn
    });

    if (!note) return res.sendStatus(404);

    if (otherData && Object.keys(otherData).length)
      await note.update(
        otherData,
        {
          where: { noteId, author: req.user!.userName }
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
  }
);
