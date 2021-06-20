import {
  DataTypes,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { sequelize } from '../../database/db';
import { Column } from '../columns/column.model';
import { Task } from '../tasks/task.model';

interface IBoard {
  id: string;
  title: string;
}

interface IBoardParams {
  title: string;
  columns: Array<{ title: string; order: number }>;
}

interface IBoardResponse extends IBoardParams {
  id: string;
}

interface IBoardParamsForUpdate {
  title: string;
  columns: Array<{ id: string; title: string; order: number }>;
}

class Board extends Model {
  public id!: string;

  public title!: string;

  public columns!: Column[];

  public getColumns!: HasManyGetAssociationsMixin<Column>;

  public addColumn!: HasManyAddAssociationMixin<Column, number>;

  public hasColumn!: HasManyHasAssociationMixin<Column, number>;

  public countColumns!: HasManyCountAssociationsMixin;

  public createColumn!: HasManyCreateAssociationMixin<Column>;

  public getTasks!: HasManyGetAssociationsMixin<Task>;

  public addTask!: HasManyAddAssociationMixin<Task, number>;

  public hasTask!: HasManyHasAssociationMixin<Task, number>;

  public countTasks!: HasManyCountAssociationsMixin;

  public createTask!: HasManyCreateAssociationMixin<Task>;
}

Board.init(
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
  },
  {
    tableName: 'boards',
    sequelize,
  },
);

export { Board, IBoard, IBoardParams, IBoardResponse, IBoardParamsForUpdate };
