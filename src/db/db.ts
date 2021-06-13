import { Sequelize } from 'sequelize';
import * as config from '../common/config';

const sequelize = new Sequelize(
  config.POSTGRES_DB as string,
  config.POSTGRES_USER as string,
  config.POSTGRES_PASSWORD,
  {
    host: config.PSQL_HOST,
    dialect: 'postgres',
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => console.log('DB has been connected'))
  .catch((err: Error) => console.log('Error: ', err.message));

export { sequelize };
