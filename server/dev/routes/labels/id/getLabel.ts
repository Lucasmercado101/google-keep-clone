import { Router } from "express";
import Label from "../../../db/models/Label";
import isAuthenticated from "../../middleware/isAuthenticated";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    const { labelId } = req.params;
    res.json(
      await Label.findOne({ where: { owner: req.user!.userName, id: labelId } })
    );
  }
);
