import { Router } from "express";
import Label from "../../db/models/Label";
import isAuthenticated from "../middleware/isAuthenticated";

const ROUTE = "/labels";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { name } = req.body;
    if (!name) return res.sendStatus(400);

    const [label] = await req.user!.$get("labels", { where: { name } });
    if (label) return res.sendStatus(409);

    const newLabel = await Label.create({
      name,
      owner: req.user!.userName
    });
    res.json(newLabel);
  }
);
