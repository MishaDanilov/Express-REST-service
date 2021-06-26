import { Request, Response, NextFunction } from 'express';
import { loggingError } from '../common/logger';

class ErrorWithStatus extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const errorHandling = (err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction) => {
  const data = {
    status: err.status || 500,
    name: err.name,
    message: err.message,
  };
  loggingError<string>(JSON.stringify(data));
  res.status(err.status || 500).json(data);
};

const uncaughtException = (err: ErrorWithStatus) => {
  const data = {
    status: err.status || 500,
    name: err.name,
    message: err.message,
  };
  loggingError<string>(JSON.stringify(data));
};

const unhandledRejection = (reason: string, promise: Promise<ErrorWithStatus>) => {
  promise.catch(err => {
    const data = {
      status: err.status || 500,
      name: err.name,
      reason,
      message: err.message,
    };
    loggingError<string>(JSON.stringify(data));
  });
};
export {
  ErrorWithStatus,
  errorHandling,
  uncaughtException as uncaughtExceptionMiddlewares,
  unhandledRejection as unhandledRejectionMiddlewares,
};
