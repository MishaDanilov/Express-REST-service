import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import createError from 'http-errors';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';
import { logging } from './middlewares/logging';
import { loginRouter } from './resources/login/login.router';
import { checkLogin } from './middlewares/checkLogin';
import './resources/relationships';

import {
  errorHandling,
  uncaughtExceptionMiddlewares,
  unhandledRejectionMiddlewares,
} from './middlewares/errorHandling';

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logging);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next): void => {
  if (req.originalUrl === '/') {
    res.send('Service is running!!');
    return;
  }
  next();
});

app.use(checkLogin);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use('/login', loginRouter);

process.on('uncaughtException', uncaughtExceptionMiddlewares);

process.on('unhandledRejection', unhandledRejectionMiddlewares);

// throw Error('Oops!')
// Promise.reject(Error('Oops!'));

app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(errorHandling);

export { app };
