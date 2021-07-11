import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { taskProviders } from './tasks.providers';
import { BoardsModule } from 'src/boards/boards.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => BoardsModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
