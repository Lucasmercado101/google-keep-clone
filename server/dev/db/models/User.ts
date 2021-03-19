import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  HasMany
} from "sequelize-typescript";
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
}
