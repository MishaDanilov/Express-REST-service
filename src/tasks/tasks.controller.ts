import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Put,
  HttpCode,
  HttpException,
  UseFilters,
  Header,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe';
import { taskSchema } from './validation/schemas/taskSchema';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  async create(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    boardId: string,
    @Body(new JoiValidationPipe(taskSchema)) createTaskDto: CreateTaskDto,
  ) {
    return await this.tasksService.create(boardId, createTaskDto);
  }

  @Get(':boardId/tasks')
  async findAll(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    boardId: string,
  ) {
    return await this.tasksService.findTaskByBoardId(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    boardId: string,
    @Param(
      'taskId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    taskId: string,
  ) {
    const task = await this.tasksService.findTaskByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    if (task) {
      return task;
    } else throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
  }

  @Put(':boardId/tasks/:taskId')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    boardId: string,
    @Param(
      'taskId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    taskId: string,
    @Body(new JoiValidationPipe(taskSchema)) updateTaskDto: UpdateTaskDto,
  ) {
    const result = await this.tasksService.update(
      boardId,
      taskId,
      updateTaskDto,
    );
    if (result) return JSON.stringify(result);
    else throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':boardId/tasks/:taskId')
  async remove(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    boardId: string,
    @Param(
      'taskId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    taskId: string,
  ) {
    const result = await this.tasksService.remove(boardId, taskId);
    if (result) return result;
    else throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
  }
}
