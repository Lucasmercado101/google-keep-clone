import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  HasMany
} from "sequelize-typescript";
import Label from "./Label";
import Note from "./Note";

@Table
export default class User extends Model {
  @PrimaryKey
  @Unique
  @Column
  userName: string;

  @Column
  password: string;

  @HasMany(() => Note)
  notes: Note[];

  @HasMany(() => Label)
  labels: Label[];
}
