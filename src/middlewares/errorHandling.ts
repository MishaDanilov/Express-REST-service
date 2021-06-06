import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

class ErrorWithStatus extends Error {
  status: number;

  constructor(status: number) {
    super();
    this.status = status;
  }
}

const errorHandling = (err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction) => {
  const data = {
    status: err.status || 500,
    name: err.name,
    message: err.message,
  };
  fs.appendFileSync(path.join(__dirname, '../../errors.txt'), JSON.stringify(data));
  fs.appendFileSync(path.join(__dirname, '../../errors.txt'), '\n');
  res.status(500).json(data);
};

const uncaughtException = (err: ErrorWithStatus) => {
  const data = {
    status: err.status || 500,
    name: err.name,
    message: err.message,
  };
  fs.appendFileSync(path.join(__dirname, '../../errors.txt'), JSON.stringify(data));
  fs.appendFileSync(path.join(__dirname, '../../errors.txt'), '\n');
};

const unhandledRejection = (reason: string, promise: Promise<ErrorWithStatus>) => {
  promise.catch(err => {
    const data = {
      status: err.status || 500,
      name: err.name,
      reason,
      message: err.message,
    };
    fs.appendFileSync(path.join(__dirname, '../../errors.txt'), JSON.stringify(data));
    fs.appendFileSync(path.join(__dirname, '../../errors.txt'), '\n');
  });
};
export {
  errorHandling,
  uncaughtException as uncaughtExceptionMiddlewares,
  unhandledRejection as unhandledRejectionMiddlewares,
};
