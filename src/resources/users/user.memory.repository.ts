import { User, IUserParams, IUserResponse, IUser } from './user.model';

const getAll = async (): Promise<Array<IUser>> => User.instances;

const CreatUser = async (user: IUserParams): Promise<User> => new User(user);

const getUserByID = async (id: string) => User.instances.find(user => user.id === id);

const UpdateUser = async (id: string, user: IUserResponse): Promise<IUserResponse | boolean> => {
  const userExist: IUser | undefined = User.instances.find((elem: IUser) => elem.id === id);
  if (userExist) {
    const index: number = User.instances.indexOf(userExist);
    Object.assign(user, { id });
    User.instances.splice(index, 1, user);
    return user;
  }
  return false;
};

const DeleteUser = async (id: string): Promise<{ message: string } | boolean> => {
  const userExist: IUser | undefined = User.instances.find((elem: IUser) => elem.id === id);
  if (userExist) {
    const index: number = User.instances.indexOf(userExist);
    User.instances.splice(index, 1);
    return { message: 'The user has been deleted' };
  }
  return false;
};
export { getAll, CreatUser, getUserByID, UpdateUser, DeleteUser };
