import { Router } from "express";
import { Op } from "sequelize";
import isAuthenticated from "../../middleware/isAuthenticated";
import isParamANumber from "../../middleware/isParamANumber";
import { editNoteAttributes, editNoteSchema } from "./editNote.validator";
import Joi, { ValidationError } from "joi";

const ROUTE = "/notes/:noteId";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isAuthenticated,
  isParamANumber("noteId"),
  async (req, res) => {
    const { noteId } = req.params;

    let editNoteData: editNoteAttributes;
    try {
      editNoteData = Joi.attempt(req.body, editNoteSchema, {
        abortEarly: false
      });
    } catch (e) {
      if (e.isJoi) return res.status(400).send((e as ValidationError).message);
      return res.sendStatus(500);
    }

    const [note] = await req.user!.$get("notes", { where: { id: noteId } });
    if (!note) return res.status(404).send("Note does not exist");

    const { labelIds, ...otherEditNoteData } = editNoteData;

    if (labelIds) {
      const labels = await req.user!.$get("labels", {
        where: { id: { [Op.in]: labelIds } }
      });
      await note.$set("labels", labels);
    }

    for (const [key, value] of Object.entries(otherEditNoteData)) {
      note.setDataValue(
        key as
          | "title"
          | "content"
          | "pinned"
          | "archived"
          | "color"
          | "id"
          | "createdAt"
          | "updatedAt"
          | "author",
        value
      );
    }

    await note.save();

    return res.json({
      ...note.toJSON(),
      //@ts-ignore
      labels: await note.$get("labels", { joinTableAttributes: [] })
    });
  }
);
