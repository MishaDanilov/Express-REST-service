import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { loggingLog } from '../common/logger';

const logging = (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const { query } = req;
  const { body } = req;
  const start = Date.now();
  const { method, url } = req;
  next();
  finished(res, () => {
    const ms = Date.now() - start;
    const data = {
      status: res.statusCode,
      url,
      method,
      query,
      params,
      body,
      ms,
    };
    loggingLog<string>(JSON.stringify(data));
  });
};
export { logging };
