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
  if (!userName || !password)
    return res
      .status(400)
      .json("You need to provide both a 'userName' and 'password'");
  const user = await User.findByPk(userName);
  if (user) return res.status(409).json("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ userName, password: hashedPassword });
  res.json(newUser);
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ userName: req.user!.userName });
  } else res.sendStatus(401);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

export default router;
