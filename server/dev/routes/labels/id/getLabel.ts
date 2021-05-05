import { Router } from "express";
import Label from "../../../db/models/Label";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { labelId } = req.params;
  res.json(
    await Label.findOne({ where: { owner: req.user!.userName, id: labelId } })
  );
});
