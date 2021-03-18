import { Table, Column, Model } from "sequelize-typescript";

@Table
export default class Note extends Model {
  @Column
  name: string;

  @Column
  content: string;
}
