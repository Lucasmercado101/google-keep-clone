import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Label from "./Label";
import Note from "./Note";

@Table
export default class NoteLabel extends Model {
  @ForeignKey(() => Label)
  @Column
  labelId: number;

  @ForeignKey(() => Note)
  @Column
  noteId: number;
}
