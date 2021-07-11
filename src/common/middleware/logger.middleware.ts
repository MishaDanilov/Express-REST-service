import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from 'src/app.service';
import { finished } from 'stream';
import { loggingLog } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private appService: AppService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { params, query, body, method, url } = req;
    const start = Date.now();
    await this.appService.createAdmin();
    await new Promise((resolve: (value: void) => void) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
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
  }
}
