import { Router } from "express";
import { Op, ValidationError, literal } from "sequelize";
import isAuthenticated from "../middleware/isAuthenticated";
import Label from "../../db/models/Label";
import {
  searchNoteSchema,
  searchNoteAttributes
} from "./searchNotes.validator";
import Joi from "joi";

const ROUTE = "/notes/search";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isAuthenticated,
  async (req, res) => {
    let searchNoteData: searchNoteAttributes;
    try {
      searchNoteData = Joi.attempt(req.body, searchNoteSchema, {
        abortEarly: false
      });
    } catch (e) {
      if (e.isJoi) return res.status(400).send((e as ValidationError).message);
      return res.sendStatus(500);
    }

    const { query, labels, archived, color, pinned } = searchNoteData;

    let notesIds: number[] = [];
    if (labels) {
      // then get all notes that have at least one of those labels
      notesIds = await req
        .user!.$get("notes", {
          attributes: ["id"],
          where: {
            "$labels.name$": {
              [Op.or]: (labels as string[]).map((labelName) => ({
                [Op.iLike]: `%${labelName}%`
              }))
            }
          },
          include: [{ model: Label, as: "labels" }]
        })
        .then((resp) => resp.map((note) => note.id));
    }

    await req
      .user!.$get("notes", {
        where: {
          // get all notes that have the labels, so that
          // it includes ALL labels, not just the where ones
          ...(notesIds && { id: { [Op.in]: notesIds } }),

          ...(query && {
            [Op.or]: {
              title: { [Op.iLike]: `%${query}%` },
              content: { [Op.iLike]: `%${query}%` }
            }
          }),

          [Op.and]: {
            ...(archived && { archived: true }),
            ...(pinned && { pinned: true }),
            ...(color && { color })
          }
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: Label,
            through: { attributes: [] }
          }
        ]
      })
      .then((notes) => res.json(notes));

    // if (labels) {
    //   const iLikes =

    //   await req
    //     .user!.$get("notes", {
    //       order: [["id", "ASC"]],
    //       include: [
    //         {
    //           model: Label,
    //           through: { attributes: [] },
    //           where: {
    //             name: {
    //               [Op.or]: iLikes
    //             }
    //           }
    //         }
    //       ]
    //     })
    //     .then((notes) => res.json(notes));
    // } else {
    //   req
    //     .user!.$get("notes", {
    //       order: [["id", "ASC"]],
    //       where: {
    //         [Op.or]: {
    //           title: { [Op.iLike]: `%${query}%` },
    //           content: { [Op.iLike]: `%${query}%` }
    //         }
    //       },
    //       include: [{ model: Label, through: { attributes: [] } }]
    //     })
    //     .then((notes) => res.json(notes));
    // }
  }
);
