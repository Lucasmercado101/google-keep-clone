import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType
} from "sequelize-typescript";
import Note from "./Note";

@Table
export default class Reminder extends Model {
  @ForeignKey(() => Note)
  @Column
  noteId: number;

  @Column({ type: DataType.DATE })
  dateTime: Date;
}
