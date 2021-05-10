import { NextFunction, Request, Response } from "express";

export default (paramToCheck: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isNaN(+req.params[paramToCheck])) return res.sendStatus(400);
  else next();
};
