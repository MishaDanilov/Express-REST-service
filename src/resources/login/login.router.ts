import express, { Router, Request, Response } from 'express';
// import { promiseHandler, HTTP_STATUS, FORBIDDEN } from '../../utils/router.helpers';
import { getAuthToken } from './login.service';
import { errorCatch } from '../../common/errorCatch';
import { ErrorWithStatus } from '../../middlewares/errorHandling';

const router: Router = express.Router();

router.route('/').post(
  errorCatch(
    async (req: Request, res: Response): Promise<void> => {
      const { login, password } = req.body;
      const token = await getAuthToken(login, password);
      if (token) {
        res.status(200).json({ token });
      } else {
        throw new ErrorWithStatus(403, 'FORBIDDEN');
      }
    },
  ),
);

export { router as loginRouter };
