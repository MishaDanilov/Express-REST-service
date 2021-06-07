import * as uuid from 'uuid';

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
  boardId: string | null;
}

interface ITaskParams {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
  boardId: string | null;
}

interface ITaskResponse extends ITaskParams {
  id: string;
}

class Task implements ITask {
  static instances: Array<ITask> = [];

  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  columnId: string | null;

  boardId: string | null;

  constructor({
    title = 'title',
    order = 0,
    description = 'Lorem ipsum',
    userId = null,
    columnId = null,
    boardId = null,
  }: ITaskParams) {
    this.id = uuid.v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    Task.instances.push(this);
  }
}

export { Task, ITask, ITaskParams, ITaskResponse };
