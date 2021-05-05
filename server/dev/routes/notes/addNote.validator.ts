import Joi from "joi";

export const newNoteSchema = Joi.object()
  .keys({
    title: Joi.string().allow(""),
    content: Joi.string().allow(""),
    labels: Joi.array().items(Joi.number()).optional(),
    pinned: Joi.boolean().default(false),
    archived: Joi.ref("pinned"),
    color: Joi.array()
      .items(
        Joi.string().valid(
          "red",
          "orange",
          "yellow",
          "green",
          "teal",
          "blue",
          "darkblue",
          "purple",
          "pink",
          "brown",
          "gray"
        )
      )
      .length(1)
      .optional()
  })
  .or("title", "content");
