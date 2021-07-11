import { CreateColumnDto } from 'src/columns/dto/create-column.dto';

export class CreateBoardDto {
  public title: string;
  public columns: Array<CreateColumnDto>;
}
