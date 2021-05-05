import { Router } from "express";
// import notesRouter from "./note";
// import labelRouter from "../../middleware/label";
import glob from "glob";

// router.use("/labels", labelRouter);
// router.use("/notes", notesRouter);

export default glob
  .sync("**/*.?(js|ts)", { cwd: `${__dirname}/` })
  .map((filename) => require(`./${filename}`))
  .map((file) => file.default)
  .filter((file) => !!file)
  .filter((router) => Object.getPrototypeOf(router) == Router)
  .reduce(
    (rootRouter, router) => rootRouter.use(router),
    Router({ mergeParams: true })
  );
