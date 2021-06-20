import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

interface Config {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  MONGO_CONNECTION_STRING: string | undefined;
  JWT_SECRET_KEY: string | undefined;
  AUTH_MODE: boolean;
  POSTGRES_HOST: string | undefined;
  POSTGRES_PORT: number | undefined;
  POSTGRES_DB: string | undefined;
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  PSQL_HOST: string | undefined;
  POSTGRES_PORT1: number | undefined;
}

const config: Config = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_PORT: process.env['POSTGRES_PORT'] as number | undefined,
  POSTGRES_DB: process.env['POSTGRES_DB'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  PSQL_HOST: process.env['PSQL_HOST'],
  POSTGRES_PORT1: process.env['POSTGRES_PORT1'] as number | undefined,
};

const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  PSQL_HOST,
  POSTGRES_PORT1,
} = config;

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  PSQL_HOST,
  POSTGRES_PORT1,
};
