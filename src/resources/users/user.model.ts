import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database/db';

interface IUserParams {
  name: string;
  login: string;
  password: string;
}

interface IUserResponse extends IUserParams {
  id: string;
}

class User extends Model {
  public id!: string;

  public name!: string;

  public login!: string;

  public password!: string;

  static toResponse(user: IUserResponse): { id: string; name: string; login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

User.init(
  {
    id: {
      type: new DataTypes.STRING(128),
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    login: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
);

export { User, IUserParams, IUserResponse };
