import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';
import path from 'path';

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
    fs.appendFileSync(path.join(__dirname, '../../logs.txt'), JSON.stringify(data));
    fs.appendFileSync(path.join(__dirname, '../../logs.txt'), '\n');
  });
};
export { logging };
