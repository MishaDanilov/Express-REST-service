export class CreateTaskDto {
  public title: string;
  public order: number;
  public description: string | null;
  public userId: string | null;
  public columnId: string | null;
  public boardId: string | null;
}
