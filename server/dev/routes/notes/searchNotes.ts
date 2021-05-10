import { Router } from "express";
import Note from "../../db/models/Note";
import { Op } from "sequelize";
import isAuthenticated from "../middleware/isAuthenticated";
import Label from "../../db/models/Label";

const ROUTE = "/notes/search";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { query, labels } = req.body;

    if (labels) {
      const iLikes = (labels as string[]).map((labelName) => ({
        [Op.iLike]: `%${labelName}%`
      }));

      await req
        .user!.$get("notes", {
          order: [["id", "ASC"]],
          include: [
            {
              model: Label,
              through: { attributes: [] },
              where: {
                name: {
                  [Op.or]: iLikes
                }
              }
            }
          ]
        })
        .then((notes) => res.json(notes));
    } else {
      req
        .user!.$get("notes", {
          order: [["id", "ASC"]],
          where: {
            [Op.or]: {
              title: { [Op.iLike]: `%${query}%` },
              content: { [Op.iLike]: `%${query}%` }
            }
          },
          include: [{ model: Label, through: { attributes: [] } }]
        })
        .then((notes) => res.json(notes));
    }
  }
);
