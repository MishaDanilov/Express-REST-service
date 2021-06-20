import { Sequelize } from 'sequelize';
import * as config from '../common/config';

const sequelize = new Sequelize(
  config.POSTGRES_DB as string,
  config.POSTGRES_USER as string,
  config.POSTGRES_PASSWORD,
  {
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
    },
  },
);

sequelize
  .authenticate()
  .then(() => console.log('DB has been connected'))
  .catch((err: Error) => console.log('Error: ', err.message));

export { sequelize };
