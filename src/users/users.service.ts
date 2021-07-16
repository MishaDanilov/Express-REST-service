import { Inject, Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = [];

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private tasksService: TasksService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const usersResult = new User(
      createUserDto.name,
      createUserDto.login,
      passwordHash,
    );
    const user = await this.userRepository.save(usersResult);
    return { id: user.id, login: user.login, name: user.name };
  }

  async findAll() {
    const usersResult = await this.userRepository.find();
    const users = usersResult.map((user) => {
      return { id: user.id, login: user.login, name: user.name };
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) return { id: user.id, login: user.login, name: user.name };
    else return user;
  }

  async findBylogin(login: string) {
    const user = await this.userRepository.findOne({ login });
    if (user)
      return {
        id: user.id,
        login: user.login,
        name: user.name,
        password: user.password,
      };
    else return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    if (user.affected) return `user ${id} has been updated`;
    return user.affected;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      await this.userRepository.remove(user);
      await this.tasksService.setUserIdNull(id);
      return `user ${id} has been deleted`;
    }
    return user;
  }
}
