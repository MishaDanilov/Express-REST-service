import { sequelize } from '../database/db';
import { User } from './users/user.model';
import { Board } from './boards/board.model';
import { Column } from './columns/column.model';
import { Task } from './tasks/task.model';

Board.hasMany(Column, { onDelete: 'cascade' });

User.hasMany(Task, { sourceKey: 'id', foreignKey: 'userId' });

Board.hasMany(Task, { onDelete: 'cascade', sourceKey: 'id', foreignKey: 'boardId' });

sequelize.sync().catch((error): void => {
  console.log('Error:', error.message);
});
