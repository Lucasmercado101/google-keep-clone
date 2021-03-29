import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  HasMany,
  BeforeCreate
} from "sequelize-typescript";
import Label from "./Label";
import Note from "./Note";
import bcrypt from "bcryptjs";

@Table
export default class User extends Model {
  @PrimaryKey
  @Unique
  @Column
  userName: string;

  @Column
  password: string;

  @BeforeCreate
  static async encryptPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }

  @HasMany(() => Note)
  notes: Note[];

  @HasMany(() => Label)
  labels: Label[];
}
