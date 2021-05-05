import { Router } from "express";
import User from "../../db/models/User";

const ROUTE = "/auth/register";

export default Router({ mergeParams: true }).post(ROUTE, async (req, res) => {
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
