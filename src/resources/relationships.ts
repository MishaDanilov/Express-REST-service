import { sequelize } from '../database/db';
import { User } from './users/user.model';
import { Board } from './boards/board.model';
import { Column } from './columns/column.model';
import { Task } from './tasks/task.model';
import { CreatUser, getUserByLogin } from './users/user.service';

Board.hasMany(Column, { onDelete: 'cascade' });

User.hasMany(Task, { sourceKey: 'id', foreignKey: 'userId' });

Board.hasMany(Task, { onDelete: 'cascade', sourceKey: 'id', foreignKey: 'boardId' });

// sequelize.sync().catch((error): void => {
//   console.log('Error:', error.message);
// });

(async function initDB() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error.message);
  }
  const admin = await getUserByLogin('admin');
  if (!admin) await CreatUser({ name: 'admin', login: 'admin', password: 'admin' });
})();
