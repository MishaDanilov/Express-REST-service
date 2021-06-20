import express from 'express';
import { User, IUserParams, IUserResponse } from './user.model';
import * as usersService from './user.service';
import { errorCatch } from '../../common/errorCatch';
import { ErrorWithStatus } from '../../middlewares/errorHandling';

const router = express.Router();

router
  .route('/')
  .get(
    errorCatch(
      async (_, res): Promise<void> => {
        const users: Array<IUserResponse> = await usersService.getAll();
        res.status(200).json(users.map(User.toResponse));
      },
    ),
  )
  .post(
    errorCatch(
      async (req, res): Promise<void> => {
        const user: IUserParams = req.body;
        const createdUser: IUserResponse = await usersService.CreatUser(user);
        res.status(201).json(User.toResponse(createdUser));
      },
    ),
  );
router
  .route('/:id')
  .get(
    errorCatch(
      async (req, res): Promise<void> => {
        const { id } = req.params;
        const user: IUserResponse | null = await usersService.getUserByID(id);
        if (!user) throw new ErrorWithStatus(404, 'User not found');
        else res.status(200).json(User.toResponse(user));
      },
    ),
  )
  .put(
    errorCatch(
      async (req, res): Promise<void> => {
        const user: IUserResponse = req.body;
        const { id } = req.params;
        const UpdatedUser: [number, User[]] = await usersService.UpdateUser(id, user);
        if (!UpdatedUser[0]) throw new ErrorWithStatus(404, 'User not found');
        else res.status(200).json({ status: true, message: 'Пользователь обновлён.' });
      },
    ),
  )
  .delete(
    errorCatch(
      async (req, res): Promise<void> => {
        const { id } = req.params;
        const result: number = await usersService.DeleteUser(id);
        if (!result) throw new ErrorWithStatus(404, 'User not found');
        else res.status(200).json({ status: true, message: 'Пользователь удалён.' });
      },
    ),
  );
export { router as userRouter };
