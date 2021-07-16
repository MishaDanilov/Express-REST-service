import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseUUIDPipe,
  Put,
  Header,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { userSchema } from 'src/users/validation/schemas/userSchema';
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new JoiValidationPipe(userSchema)) createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.findOne(id);
    if (user) return user;
    else throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    id: string,
    @Body(new JoiValidationPipe(userSchema))
    updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.update(id, updateUserDto);
    if (result) return JSON.stringify(result);
    else throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    id: string,
  ) {
    const result = await this.usersService.remove(id);
    if (result) return result;
    else throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
  }
}
