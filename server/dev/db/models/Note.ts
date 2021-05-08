import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey,
  DataType
} from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import Label from "./Label";
import NoteLabel from "./NoteLabel";
import User from "./User";

interface NoteAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  content?: string;
  author: string;
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
  labels?: Label[];
}

interface NoteCreationAttributes extends Optional<NoteAttributes, "id"> {}

@Table
export default class Note extends Model<
  NoteAttributes,
  NoteCreationAttributes
> {
  @Column({ allowNull: true, type: DataTypes.STRING(150) })
  title: string;

  @Column({ allowNull: true, type: DataTypes.STRING(750) })
  content: string;

  @Column({ allowNull: true })
  pinned: boolean;

  @Column({ allowNull: true })
  archived: boolean;

  @Column({
    allowNull: true,
    type: DataTypes.ENUM(
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
  })
  color:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "darkblue"
    | "purple"
    | "pink "
    | "brown"
    | "gray";

  @ForeignKey(() => User)
  @Column
  author: string;

  @BelongsToMany(() => Label, () => NoteLabel)
  labels: Array<Label & { NoteLabel: NoteLabel }>;
}
//TODO: Add Types (reminder, collaborated) as an enum? and infer from what it is and has?
