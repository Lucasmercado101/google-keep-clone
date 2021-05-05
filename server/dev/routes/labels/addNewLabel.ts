import { Router } from "express";
import Label from "../../db/models/Label";
import isAuthenticated from "../middleware/isAuthenticated";

const ROUTE = "/labels";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const labelExists = !!(await req.user!.$get("labels")).find(
      (label) => label.name === req.body.name
    );
    if (labelExists) return res.sendStatus(409);
    if (!req.body.name) return res.status(400).json("You must provide a name");
    const newLabel = await Label.create({ name: req.body.name });
    await req.user!.$add("label", newLabel);
    res.sendStatus(200);
  }
);
