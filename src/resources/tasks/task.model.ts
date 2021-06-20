import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database/db';

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string | null;
  userId: string | null;
  columnId: string | null;
  boardId: string | null;
}

interface ITaskParams {
  title: string;
  order: number;
  description: string | null;
  userId: string | null;
  columnId: string | null;
  boardId: string | null;
}

interface ITaskResponse extends ITaskParams {
  id: string;
}

class Task extends Model {
  public id!: string;

  public title!: string;

  public order!: number;

  public description!: string | null;

  public userId!: string | null;

  public boardId!: string | null;

  public columnId!: string | null;
}

Task.init(
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
    description: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    userId: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    boardId: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    columnId: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: 'tasks',
    sequelize,
  },
);

export { Task, ITask, ITaskParams, ITaskResponse };
