import { Router } from "express";
import Note from "../../db/models/Note";
import { Op } from "sequelize";

const ROUTE = "/notes/search";

const noteAttributesToReturn = [
  "title",
  "content",
  "id",
  "pinned",
  "archived",
  "color"
];

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
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
});
