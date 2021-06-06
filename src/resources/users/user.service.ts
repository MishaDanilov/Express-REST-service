import * as usersRepo from './user.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';
import { IUserParams, IUserResponse, IUser, User } from './user.model';

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const CreatUser = (user: IUserParams): Promise<User> => usersRepo.CreatUser(user);

const getUserByID = (id: string | undefined): Promise<IUser | undefined> =>
  usersRepo.getUserByID(id);

const UpdateUser = (
  id: string | undefined,
  user: IUserResponse,
): Promise<boolean | IUserResponse> => usersRepo.UpdateUser(id, user);

const DeleteUser = (id: string | undefined): Promise<boolean | { message: string }> => {
  tasksRepo.setUserIdNull(id);
  return usersRepo.DeleteUser(id);
};

export { getAll, CreatUser, getUserByID, UpdateUser, DeleteUser };
