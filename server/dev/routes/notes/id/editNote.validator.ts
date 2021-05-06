import Joi from "joi";

export interface editNoteAttributes {
  title?: string;
  content?: string;
  labelIds?: number[];
  pinned?: boolean;
  archived?: boolean;
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

const pinnedSchema = Joi.boolean()
  .when("archived", { is: true, then: false })
  .messages({
    "any.only": "'pinned' and 'archived' cannot be both true simultaneously"
  });

export const editNoteSchema = Joi.object<editNoteAttributes>()
  .keys({
    title: Joi.alternatives()
      .try(Joi.string(), Joi.number().cast("string"))
      .optional(),
    content: Joi.alternatives()
      .try(Joi.string(), Joi.number().cast("string"))
      .optional(),
    labelIds: Joi.array().items(Joi.number()).optional(),
    pinned: pinnedSchema.optional(),
    archived: Joi.boolean().optional(),
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
      .valid(null)
      .empty("")
      .optional()
  })
  .label("data");
