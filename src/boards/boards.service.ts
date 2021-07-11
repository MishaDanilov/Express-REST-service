import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
    private columnsService: ColumnsService,
    @Inject(forwardRef(() => TasksService))
    private tasksService: TasksService,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = new Board(createBoardDto.title);
    await this.boardRepository.save(board);
    await this.columnsService.create(board.id, createBoardDto.columns);
    const columnsResult = await this.columnsService.findAll(board.id);
    const columns = columnsResult.map((column) => {
      return { id: column.id, title: column.title, order: column.order };
    });
    return { ...board, columns };
  }

  async findAll() {
    const boards = await this.boardRepository.find();
    const map = await Promise.all(
      boards.map(async (board) => {
        const columns = await this.columnsService.findAll(board.id);
        const columnsNew = columns.map((column) => {
          return { id: column.id, title: column.title, order: column.order };
        });
        const newBoard = {
          id: board.id,
          title: board.title,
          columns: columnsNew,
        };
        return newBoard;
      }),
    );
    return map;
  }

  async findOne(id: string) {
    const board = await this.boardRepository.findOne(id);
    if (board) {
      const columnsResult = await this.columnsService.findAll(board.id);
      const columns = columnsResult.map((column) => {
        return { id: column.id, title: column.title, order: column.order };
      });
      return { ...board, columns };
    }
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.update(id, {
      title: updateBoardDto.title,
    });
    await this.columnsService.update(id, updateBoardDto.columns);
    if (board.affected) return `board ${id} has been updated`;
    return board.affected;
  }

  async remove(id: string) {
    const board = await this.boardRepository.findOne(id);
    await new Promise((resolve: (value: void) => void) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    if (board) {
      await this.tasksService.removeAll(board.id);
      await new Promise((resolve: (value: void) => void) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
      await this.columnsService.removeAll(board.id);
      await new Promise((resolve: (value: void) => void) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
      await this.boardRepository.remove(board);
      return `board ${id} has been deleted`;
    }
    return board;
  }
}
