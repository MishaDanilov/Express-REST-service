import { Connection, Repository } from 'typeorm';
import { Board } from './entities/board.entity';

export const boardProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (connection: Connection): Repository<Board> =>
      connection.getRepository(Board),
    inject: ['DATABASE_CONNECTION'],
  },
];
