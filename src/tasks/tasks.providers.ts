import { Connection, Repository } from 'typeorm';
import { Task } from './entities/task.entity';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (connection: Connection): Repository<Task> =>
      connection.getRepository(Task),
    inject: ['DATABASE_CONNECTION'],
  },
];
