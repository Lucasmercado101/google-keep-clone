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

  if (password.length > 255)
    return res
      .status(400)
      .json("Password must be smaller or equal than 255 characters");
  if (userName.length > 255)
    return res
      .status(400)
      .json("Username must be smaller or equal than 255 characters");
  const user = await User.findByPk(userName);
  if (user) return res.status(409).json("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ userName, password: hashedPassword });
    res.json(newUser);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
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
