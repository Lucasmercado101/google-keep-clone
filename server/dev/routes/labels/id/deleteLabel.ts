import { Router } from "express";
import isAuthenticated from "../../middleware/isAuthenticated";
import isParamANumber from "../../middleware/isParamANumber";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isAuthenticated,
  isParamANumber("labelId"),
  async (req, res) => {
    const labels = await req.user!.$get("labels");
    const label = labels.find((label) => label.id === +req.params.labelId);
    if (!label) return res.sendStatus(404);
    await label.destroy();
    res.sendStatus(200);
  }
);
