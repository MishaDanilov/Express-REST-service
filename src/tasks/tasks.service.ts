import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    @Inject(forwardRef(() => BoardsService))
    private boardsService: BoardsService,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const board = await this.boardsService.findOne(boardId);
    if (board) {
      const task = new Task(
        createTaskDto.title,
        createTaskDto.order,
        createTaskDto.description,
        createTaskDto.userId,
        boardId,
        createTaskDto.columnId,
      );
      this.taskRepository.save(task);
      return {
        id: task.id,
        title: task.title,
        order: task.order,
        description: task.description,
        userId: task.userId,
        boardId: task.boardId,
        columnId: task.columnId,
      };
    }
    return board;
  }

  async findTaskByBoardId(boardId: string) {
    const tasks = await this.taskRepository.find({ boardId });
    await new Promise((resolve: (value: void) => void) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
    return tasks;
  }

  async findTaskByBoardIdAndTaskId(boardId: string, taskId: string) {
    const task = await this.taskRepository.findOne({ id: taskId, boardId });
    return task;
  }

  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.update(
      { id: taskId, boardId },
      { ...updateTaskDto, boardId },
    );
    if (task.affected) return `task ${taskId} has been updated`;
    await new Promise((resolve: (value: void) => void) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
    return task.affected;
  }

  async remove(boardId: string, taskId: string) {
    const task = await this.taskRepository.findOne({ id: taskId, boardId });
    if (task) {
      await this.taskRepository.remove(task);
      return `task ${taskId} has been deleted`;
    }
    return task;
  }

  async removeAll(boardId: string) {
    const tasks = await this.findTaskByBoardId(boardId);
    tasks.forEach(async (task) => {
      await this.remove(boardId, task.id);
    });
  }

  async setUserIdNull(userId: string) {
    await this.taskRepository.update({ userId }, { userId: null });
  }
}
