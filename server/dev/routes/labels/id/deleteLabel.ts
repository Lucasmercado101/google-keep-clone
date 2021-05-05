import { Router } from "express";
import isAuthenticated from "../../middleware/isAuthenticated";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const labels = await req.user!.$get("labels");
    const label = labels.find((label) => label.id === +req.params.labelId);
    label && (await label.destroy());
    res.sendStatus(200);
  }
);
