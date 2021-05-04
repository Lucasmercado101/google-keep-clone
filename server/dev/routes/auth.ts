import { Router } from "express";
import passport from "passport";
const router = Router();
import User from "../db/models/User";

router.post("/login", (req, res, next) =>
  passport.authenticate("local", function (err: Error, user: User) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);

    req.login(user, function (err) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
    });
  })(req, res, next)
);

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
  try {
    const newUser = await User.create({ userName, password });
    res.json(newUser.userName);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ userName: req.user!.userName });
  } else res.sendStatus(401);
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.clearCookie("connect.sid");
  res.sendStatus(200);
});

export default router;
