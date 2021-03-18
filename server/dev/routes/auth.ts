import { Router } from "express";
import passport from "passport";
const router = Router();
import User from "../db/models/User";
import bcrypt from "bcryptjs";

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findByPk(userName);
  if (user) return res.status(409).json({ error: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ userName, password: hashedPassword });
  res.sendStatus(200);
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) return res.sendStatus(200);
  else res.sendStatus(401);
});

export default router;
