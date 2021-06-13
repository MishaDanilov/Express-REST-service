import express from 'express';
import { User, IUserParams, IUserResponse, IUser } from './user.model';
import * as usersService from './user.service';
import { errorCatch } from '../../common/errorCatch';

const router = express.Router();

router
  .route('/')
  .get(
    errorCatch(
      async (_, res): Promise<void> => {
        const users: Array<IUser> = await usersService.getAll();
        res.status(200).json(users.map(User.toResponse));
      },
    ),
  )
  .post(
    errorCatch(
      async (req, res): Promise<void> => {
        const user: IUserParams = req.body;
        const createdUser: User = await usersService.CreatUser(user);
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
        const user: IUser | undefined = await usersService.getUserByID(id);
        if (!user) res.status(404).end();
        else res.status(200).json(User.toResponse(user));
      },
    ),
  )
  .put(
    errorCatch(
      async (req, res): Promise<void> => {
        const user: IUserResponse = req.body;
        const { id } = req.params;
        const UpdatedUser: boolean | IUserResponse = await usersService.UpdateUser(id, user);
        if (!UpdatedUser) res.status(404).end();
        else res.status(200).json(User.toResponse(<IUserResponse>UpdatedUser));
      },
    ),
  )
  .delete(
    errorCatch(
      async (req, res): Promise<void> => {
        const { id } = req.params;
        const result: boolean | { message: string } = await usersService.DeleteUser(id);
        if (!result) res.status(404).end();
        else res.status(204).json(result);
      },
    ),
  );
export { router as userRouter };
