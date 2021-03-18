import { Table, Column, Model, BelongsToMany } from "sequelize-typescript";
import Note from "./Note";
import NoteLabel from "./NoteLabel";

@Table
export default class Label extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Note, () => NoteLabel)
  notes: Note[];
}
