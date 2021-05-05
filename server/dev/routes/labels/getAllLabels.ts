import { Router } from "express";

const ROUTE = "/labels";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  res.json(await req.user?.$get("labels"));
});
