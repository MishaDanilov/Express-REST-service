import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByLogin } from '../users/user.service';
import { JWT_SECRET_KEY } from '../../common/config';

export const getAuthToken = async (
  login: string,
  password: string,
): Promise<string | undefined> => {
  try {
    const user = await getUserByLogin(login);
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) return undefined;
      if (JWT_SECRET_KEY)
        return jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
      return undefined;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};
