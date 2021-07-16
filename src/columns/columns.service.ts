import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Columns } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @Inject('COLUMN_REPOSITORY')
    private columnRepository: Repository<Columns>,
  ) {}

  async create(boardID: string, createColumnArrayDto: Array<CreateColumnDto>) {
    await new Promise((resolve: (value: void) => void) => {
      createColumnArrayDto.forEach(async (column, index, arr) => {
        const columns = new Columns(column.title, column.order, boardID);
        await this.columnRepository.save(columns);
        if (index == arr.length - 1) resolve();
      });
    });
  }

  async findAll(boardID: string) {
    return await this.columnRepository.find({ boardID });
  }

  async findOne(id: string) {
    return await this.columnRepository.findOne({ id });
  }

  async removeAll(boardID: string) {
    const columns = await this.findAll(boardID);
    columns.forEach(async (column) => {
      const columnRemove = await this.findOne(column.id);
      await this.columnRepository.remove(columnRemove);
    });
  }

  async update(boardID: string, updateColumnArrayDto: Array<UpdateColumnDto>) {
    await this.removeAll(boardID);
    await new Promise((resolve: (value: void) => void) => {
      updateColumnArrayDto.forEach(async (column, index, arr) => {
        const columns = new Columns(
          column.title,
          column.order,
          boardID,
          column.id,
        );
        await new Promise((resolve: (value: void) => void) => {
          setTimeout(() => {
            resolve();
          }, 200);
        });
        await this.columnRepository.save(columns);
        if (index == arr.length - 1) resolve();
      });
    });
  }
}
