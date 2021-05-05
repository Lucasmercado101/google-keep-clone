import Joi from "joi";

export interface newNoteAttributes {
  title?: string;
  content?: string;
  labels?: number[];
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
    | "gray"
    | null;
}

export const newNoteSchema = Joi.object<newNoteAttributes>()
  .keys({
    title: Joi.string(),
    content: Joi.string(),
    labels: Joi.array().items(Joi.number()).optional(),
    pinned: Joi.boolean()
      .when("archived", { is: true, then: false })
      .default(false),

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
        "gray",
        null
      )
      .optional()
  })
  .or("title", "content")
  .label("data")
  .messages({
    "any.only": "'pinned' and 'archived' cannot be both true simultaneously"
  });
