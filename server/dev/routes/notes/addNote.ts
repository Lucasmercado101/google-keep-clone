import { Router } from "express";
import Note from "../../db/models/Note";
import Label from "../../db/models/Label";
import { Op } from "sequelize";
import isAuthenticated from "../middleware/isAuthenticated";
import { newNoteSchema, newNoteAttributes } from "./addNote.validator";
import Joi, { ValidationError } from "joi";

const ROUTE = "/notes";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    let newNoteData: newNoteAttributes;
    try {
      newNoteData = Joi.attempt(req.body, newNoteSchema, { abortEarly: false });
    } catch (e) {
      if (e.isJoi) return res.status(400).send((e as ValidationError).message);
      return res.sendStatus(500);
    }

    const { labels: labelIds, ...noteData } = newNoteData;
    const newNote = await Note.create({
      author: req.user!.userName,
      ...noteData
    });

    const labels = await req.user!.$get("labels", {
      where: { id: { [Op.in]: labelIds } }
    });
    if (labels) await newNote.$set("labels", labels);

    return res.json({
      ...newNote.toJSON(),
      //@ts-ignore
      labels: await newNote.$get("labels", { joinTableAttributes: [] })
    });
  }
);
