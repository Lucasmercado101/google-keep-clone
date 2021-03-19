import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey
} from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import Label from "./Label";
import NoteLabel from "./NoteLabel";
import User from "./User";

interface NoteAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  content: string;
  author: string;
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

  @ForeignKey(() => User)
  @Column
  author: string;

  @BelongsToMany(() => Label, () => NoteLabel)
  labels: Array<Label & { NoteLabel: NoteLabel }>;
}
