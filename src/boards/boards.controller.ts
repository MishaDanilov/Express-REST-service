import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
  Put,
  Header,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { boardSchema } from './validation/schemas/boardSchema';

@Controller('boards')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new JoiValidationPipe(boardSchema)) createBoardDto: CreateBoardDto,
  ) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
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
    const board = await this.boardsService.findOne(id);
    if (board) return board;
    else throw new HttpException('Board is not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        version: '4',
      }),
    )
    id: string,
    @Body(new JoiValidationPipe(boardSchema)) updateBoardDto: UpdateBoardDto,
  ) {
    const result = await this.boardsService.update(id, updateBoardDto);
    if (result) return JSON.stringify(result);
    else throw new HttpException('Board is not found', HttpStatus.NOT_FOUND);
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
    const result = await this.boardsService.remove(id);
    if (result) return result;
    else throw new HttpException('Board is not found', HttpStatus.NOT_FOUND);
  }
}
