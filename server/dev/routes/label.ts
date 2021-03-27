import { Router } from "express";
import Label from "../db/models/Label";
const router = Router();
import isAuthenticated from "./middleware/isAuthenticated";
import { Op } from "sequelize";

router.use("/", isAuthenticated);

router.get("/", async (req, res) => {
  res.json(await req.user?.$get("labels"));
});

router.post("/", async (req, res) => {
  if (
    !!(await req.user!.$get("labels")).find(
      (label) => label.name === req.body.name
    )
  )
    return res.sendStatus(409);
  if (!req.body.name) return res.status(400).json("You must provide a name");
  const newLabel = await Label.create({ name: req.body.name });
  await req.user!.$add("label", newLabel);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const labels = await req.user!.$get("labels");
  const label = labels.find((label) => label.id === +req.params.id);
  label && (await label.destroy());
  res.sendStatus(200);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Label.findOne({ where: { owner: req.user!.userName, id } }));
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id || !name) return res.sendStatus(400);

  const label = await Label.findOne({
    where: { owner: req.user!.userName, id }
  });
  if (!label) return res.sendStatus(404);

  const existingLabel = await Label.findOne({
    where: { name }
  });
  if (existingLabel && existingLabel.id !== +id) return res.sendStatus(409);

  label.name = name;
  await label.save();
  res.sendStatus(200);
});

export default router;
