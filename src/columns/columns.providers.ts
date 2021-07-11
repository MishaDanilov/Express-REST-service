import { Connection, Repository } from 'typeorm';
import { Columns } from './entities/column.entity';

export const columnProviders = [
  {
    provide: 'COLUMN_REPOSITORY',
    useFactory: (connection: Connection): Repository<Columns> =>
      connection.getRepository(Columns),
    inject: ['DATABASE_CONNECTION'],
  },
];
