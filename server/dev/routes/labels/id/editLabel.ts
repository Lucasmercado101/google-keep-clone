import { Router } from "express";
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
    if (!name) return res.sendStatus(400);

    const [label] = await req.user!.$get("labels", { where: { id: labelId } });
    if (!label) return res.sendStatus(404);

    const [existingLabel] = await req.user!.$get("labels", {
      where: { name }
    });
    if (existingLabel) return res.sendStatus(409);

    label.name = name;
    await label.save();
    res.json(label);
  }
);
