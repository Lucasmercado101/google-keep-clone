import { Router } from "express";
import Label from "../../../db/models/Label";
import isAuthenticated from "../../middleware/isAuthenticated";
import isParamANumber from "../../middleware/isParamANumber";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isAuthenticated,
  isParamANumber("labelId"),
  async (req, res) => {
    const { labelId } = req.params;
    const { name } = req.body;
    if (!labelId || !name) return res.sendStatus(400);

    const label = await Label.findOne({
      where: { owner: req.user!.userName, id: labelId }
    });
    if (!label) return res.sendStatus(404);

    const existingLabel = await Label.findOne({
      where: { name }
    });
    if (existingLabel && existingLabel.id !== +labelId)
      return res.sendStatus(409);

    label.name = name;
    await label.save();
    res.sendStatus(200);
  }
);
