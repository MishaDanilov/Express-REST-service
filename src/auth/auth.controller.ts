import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('login')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const token = await this.authService.login(loginAuthDto);
    if (token) {
      return { token };
    } else {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
  }
}
