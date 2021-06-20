import * as usersRepo from './user.memory.repository';
import { IUserParams, IUserResponse, User } from './user.model';

const getAll = (): Promise<IUserResponse[]> => usersRepo.getAll();

const CreatUser = (user: IUserParams): Promise<IUserResponse> => usersRepo.CreatUser(user);

const getUserByID = (id: string | undefined): Promise<User | null> => usersRepo.getUserByID(id);

const UpdateUser = (id: string | undefined, user: IUserResponse): Promise<[number, User[]]> =>
  usersRepo.UpdateUser(id, user);

const DeleteUser = (id: string | undefined): Promise<number> => {
  return usersRepo.DeleteUser(id);
};

export { getAll, CreatUser, getUserByID, UpdateUser, DeleteUser };
