import Joi from "joi";

export interface newNoteAttributes {
  title?: string;
  content?: string;
  labelIds?: number[];
  pinned: boolean;
  archived: boolean;
  color?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "darkblue"
    | "purple"
    | "pink"
    | "brown"
    | "gray";
}

const pinnedSchema = Joi.boolean()
  .when("archived", { is: true, then: false })
  .default(false)
  .messages({
    "any.only": "'pinned' and 'archived' cannot be both true simultaneously"
  });

export const newNoteSchema = Joi.object<newNoteAttributes>()
  .keys({
    title: Joi.string(),
    content: Joi.string(),
    labelIds: Joi.array().items(Joi.number()).optional(),
    pinned: pinnedSchema,
    archived: Joi.boolean().default(false),
    color: Joi.string()
      .valid(
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
      .empty("")
      .optional()
  })
  .or("title", "content")
  .label("data");
