import Joi from "joi";

export interface searchNoteAttributes {
  query?: string;
  labels?: string[];
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
    | "gray";
}

const pinnedSchema = Joi.boolean()
  .when("archived", { is: true, then: false })
  .messages({
    "any.only": "'pinned' and 'archived' cannot be both true simultaneously"
  });

export const searchNoteSchema = Joi.object<searchNoteAttributes>()
  .keys({
    query: Joi.alternatives()
      .try(Joi.string(), Joi.number().cast("string"))
      .optional(),
    labels: Joi.array()
      .items(Joi.string(), Joi.number().cast("string"))
      .optional(),
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
      .optional()
  })
  .or("query", "labels", "pinned", "archived", "color")
  .label("data");
