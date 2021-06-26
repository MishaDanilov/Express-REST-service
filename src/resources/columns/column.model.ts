import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database/db';

interface IColumnParams {
  title: string;
  order: number;
}

interface IColumn {
  title: string;
  order: number;
  id: string;
  BoardId: string;
}

class Column extends Model {
  public id!: string;

  public title!: string;

  public order!: number;

  public BoardId!: string;
}

Column.init(
  {
    id: {
      type: new DataTypes.STRING(128),
      primaryKey: true,
      allowNull: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    order: {
      type: new DataTypes.INTEGER(),
      allowNull: true,
    },
  },
  {
    tableName: 'columns',
    sequelize,
  },
);

export { Column, IColumnParams, IColumn };
