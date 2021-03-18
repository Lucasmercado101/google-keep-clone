import { Table, Column, Model, BelongsToMany } from "sequelize-typescript";
import Label from "./Label";
import NoteLabel from "./NoteLabel";
@Table
export default class Note extends Model {
  @Column({ allowNull: true })
  name: string;

  @Column({ allowNull: true })
  content: string;

  @BelongsToMany(() => Label, () => NoteLabel)
  labels: Label[];
}
