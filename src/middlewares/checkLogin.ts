import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET_KEY } from '../common/config';
import { ErrorWithStatus } from './errorHandling';
import { getUserByLoginAndId } from '../resources/users/user.service';

const isUnauthorizedPath = (url: string) => {
  return ['/login', '/doc', '/'].includes(url);
};

async function checkLogin(req: Request, _res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS' || isUnauthorizedPath(req.url)) {
    return next();
  }
  const sessionToken = req.headers.authorization;
  if (sessionToken && !sessionToken.includes('Bearer')) {
    return next(new ErrorWithStatus(401, 'Bearer authorization scheme does not found'));
  }
  if (sessionToken) {
    jwt.verify(
      sessionToken.split(' ')[1] as string,
      JWT_SECRET_KEY as string,
      async (_err, decoded) => {
        if (decoded) {
          const user = await getUserByLoginAndId(decoded['login'], decoded['userId']);
          if (user) return next();
          return next(new ErrorWithStatus(401, 'User is not found'));
        }
        return next(new ErrorWithStatus(401, 'bad authorization1'));
      },
    );
  } else return next(new ErrorWithStatus(401, 'No token provided'));
  return undefined;
}

export { checkLogin };
