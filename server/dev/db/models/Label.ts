import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey,
  Scopes
} from "sequelize-typescript";
import Note from "./Note";
import NoteLabel from "./NoteLabel";
import User from "./User";

@Scopes(() => ({
  userLabel(ownerUserName) {
    return {
      where: {
        owner: ownerUserName
      }
    };
  }
}))
@Table
export default class Label extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Note, () => NoteLabel)
  notes: Note[];

  @ForeignKey(() => User)
  @Column
  owner: string;
}
