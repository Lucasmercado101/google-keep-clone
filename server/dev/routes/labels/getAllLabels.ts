import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated";

const ROUTE = "/labels";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    res.json(await req.user?.$get("labels"));
  }
);
