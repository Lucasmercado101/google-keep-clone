import { Router } from "express";
import Label from "../../db/models/Label";
import isAuthenticated from "../middleware/isAuthenticated";
import Joi from "joi";
import { ValidationError } from "sequelize/types";

const ROUTE = "/notes";

const paramsSchema = Joi.object({
  pinned: Joi.boolean().optional(),
  archived: Joi.boolean().optional()
}).xor("pinned", "archived");

export default Router({ mergeParams: true }).get(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    try {
      Joi.attempt(req.query, paramsSchema);
    } catch (e) {
      if (e.isJoi) return res.status(400).send((e as ValidationError).message);
      return res.sendStatus(500);
    }

    const { pinned, archived } = req.query;

    res.json(
      await req.user!.$get("notes", {
        include: [
          {
            model: Label,
            through: { attributes: [] }
          }
        ],
        ...(pinned && { where: { pinned: true } }),
        ...(archived && { where: { archived: true } })
      })
    );
  }
);
