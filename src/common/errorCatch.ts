import { Request, Response, NextFunction, RequestHandler } from 'express';

const errorCatch = (op: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await op(req, res, next);
  } catch (error) {
    next(error);
  }
};
export { errorCatch };
