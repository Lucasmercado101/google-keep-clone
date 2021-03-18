import { Table, Column, Model } from "sequelize-typescript";

@Table
class Note extends Model {
  @Column
  name: string;

  @Column
  content: string;
}

export default Note;
