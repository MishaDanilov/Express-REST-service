import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.method === 'OPTIONS') {
      return true;
    }
    const sessionToken = req.headers.authorization;
    if (sessionToken && !sessionToken.includes('Bearer'))
      throw new HttpException(
        'Bearer authorization scheme does not found',
        HttpStatus.FORBIDDEN,
      );
    if (sessionToken) {
      const isVerifythis = this.jwtService.verify(
        sessionToken.split(' ')[1] as string,
        { secret: process.env.JWT_SECRET_KEY },
      );
      return isVerifythis;
    } else {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }
  }
}
