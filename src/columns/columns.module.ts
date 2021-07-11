import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { DatabaseModule } from 'src/database/database.module';
import { columnProviders } from './columns.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...columnProviders, ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
