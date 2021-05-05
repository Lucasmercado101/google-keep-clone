import Joi from "joi";

export interface newNote {
  title: string;
  content: string;
  labels: number[];
  pinned: boolean;
  archived: boolean;
  color:
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

export const newNoteSchema = Joi.object<newNote>()
  .keys({
    title: Joi.string(),
    content: Joi.string(),
    labels: Joi.array().items(Joi.number()).optional(),
    pinned: Joi.alternatives()
      .conditional("archived", {
        is: true,
        then: false,
        otherwise: Joi.boolean().default(false)
      })
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
  .or("title", "content");
