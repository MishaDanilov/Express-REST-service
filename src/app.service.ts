import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async createAdmin() {
    const admin = await this.usersService.findBylogin('admin');
    if (!admin)
      await this.usersService.create({
        name: 'admin',
        login: 'admin',
        password: 'admin',
      });
  }

  getHello(): string {
    return 'Hello World!!';
  }
}
