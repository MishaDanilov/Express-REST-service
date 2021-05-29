import * as uuid from 'uuid';

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface IUserParams {
  name: string;
  login: string;
  password: string;
}

interface IUserResponse extends IUserParams {
  id: string;
}

class User implements IUser {
  static instances: Array<IUser> = [];

  id: string;

  name: string;

  login: string;

  password: string;

  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' }: IUserParams) {
    this.id = uuid.v4();
    this.name = name;
    this.login = login;
    this.password = password;
    User.instances.push(this);
  }

  static toResponse(user: IUserResponse) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User, IUserParams, IUserResponse, IUser };
