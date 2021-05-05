import { Router } from "express";

const ROUTE = "/labels/:labelId";

export default Router({ mergeParams: true }).delete(ROUTE, async (req, res) => {
  const labels = await req.user!.$get("labels");
  const label = labels.find((label) => label.id === +req.params.labelId);
  label && (await label.destroy());
  res.sendStatus(200);
});
