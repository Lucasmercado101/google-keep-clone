import { Router } from "express";
import passport from "passport";
const router = Router();
import User from "../db/models/User";
import bcrypt from "bcryptjs";

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ userName: req.user!.userName });
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
  console.log(req.user);
  if (req.isAuthenticated()) {
    return res.json({ userName: req.user!.userName });
  } else res.sendStatus(401);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

export default router;
