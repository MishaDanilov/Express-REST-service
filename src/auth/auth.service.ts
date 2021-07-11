import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const { login, password } = loginAuthDto;
    const user = await this.usersService.findBylogin(login);
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) return undefined;
      if (process.env.JWT_SECRET_KEY) {
        const token = this.jwtService.sign(
          { userId: user.id, login },
          { secret: process.env.JWT_SECRET_KEY },
        );
        return token;
      }
      return undefined;
    }
    return undefined;
  }
}
