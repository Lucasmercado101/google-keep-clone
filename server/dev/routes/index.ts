import { Router } from "express";
import authRouter from "./auth";
import notesRouter from "./note";
import labelRouter from "./label";

const router = Router();

router.use("/auth", authRouter);
router.use("/label", labelRouter);
router.use("/note", notesRouter);

export default router;
