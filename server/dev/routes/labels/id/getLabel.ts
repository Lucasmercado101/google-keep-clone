import { Router } from "express";
import Label from "../../../db/models/Label";
import isAuthenticated from "../../middleware/isAuthenticated";
import isParamANumber from "../../middleware/isParamANumber";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isAuthenticated,
  isParamANumber("labelId"),
  async (req, res) => {
    const { labelId } = req.params;
    res.json(await req.user!.$get("labels", { where: { id: labelId } }));
  }
);
