import { Table, Column, Model, PrimaryKey, Unique } from "sequelize-typescript";

@Table
export default class User extends Model {
  @PrimaryKey
  @Unique
  @Column
  userName: string;

  @Column
  password: string;
}
