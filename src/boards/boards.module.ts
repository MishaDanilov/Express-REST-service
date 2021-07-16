import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { DatabaseModule } from 'src/database/database.module';
import { boardProviders } from './boards.providers';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => TasksModule),
    ColumnsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BoardsController],
  providers: [...boardProviders, BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
