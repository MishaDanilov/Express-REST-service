import { loggingError } from './logger';

const uncaughtException = (err: Error) => {
  const data = {
    name: err.name,
    message: err.message,
  };
  loggingError<string>(JSON.stringify(data));
};

const unhandledRejection = (reason: string, promise: Promise<Error>) => {
  promise.catch((err) => {
    const data = {
      name: err.name,
      reason,
      message: err.message,
    };
    loggingError<string>(JSON.stringify(data));
  });
};

export { uncaughtException, unhandledRejection };
