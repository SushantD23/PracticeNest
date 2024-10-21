import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class crudModel extends Model<crudModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  tId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tAge: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  tAlive: Boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,    
  })
  tprofile: string;
  unlink: any;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  tjsonb: object;
}
