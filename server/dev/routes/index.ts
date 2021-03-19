import { Router } from "express";
import authRouter from "./auth";
import notesRouter from "./notes"

const router = Router();

router.use("/auth", authRouter);
router.use("/note", notesRouter)

export default router;
