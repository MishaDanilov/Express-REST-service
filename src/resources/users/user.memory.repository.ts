import { v4 } from 'uuid';
import { User, IUserParams, IUserResponse } from './user.model';

const getAll = async (): Promise<Array<User>> => {
  const users = await User.findAll({ raw: true });
  return users;
};

const CreatUser = async (param: IUserParams): Promise<IUserResponse> => {
  const createUser = { id: v4(), ...param };
  const result = await User.create({
    id: createUser.id,
    name: createUser.name,
    login: createUser.login,
    password: createUser.password,
  });
  const user = {
    id: result.id,
    name: result.name,
    login: result.login,
    password: result.password,
  };
  return user;
};

const getUserByID = async (id: string | undefined): Promise<User | null> => {
  const user = await User.findByPk(id);
  return user;
};

const UpdateUser = async (
  id: string | undefined,
  user: IUserResponse,
): Promise<[number, User[]]> => {
  const result = await User.update(user, { where: { id } });
  return result;
};

const DeleteUser = async (id: string | undefined): Promise<number> => {
  const result = await User.destroy({ where: { id } });
  return result;
};
export { getAll, CreatUser, getUserByID, UpdateUser, DeleteUser };
