import * as uuid from 'uuid';

interface IBoard {
  id: string;
  title: string;
  columns: Array<{ id: string; title: string; order: number }>;
}

interface IBoardParams {
  title: string;
  columns: Array<{ id: string; title: string; order: number }>;
}

interface IBoardResponse extends IBoardParams {
  id: string;
}

class Board implements IBoard {
  static instances: Array<IBoard> = [];

  id: string;

  title: string;

  columns: Array<{ id: string; title: string; order: number }>;

  constructor({
    title = 'TITLE',
    columns = [{ id: uuid.v4(), title: 'Backlog', order: 1 }],
  }: IBoardParams) {
    this.id = uuid.v4();
    this.title = title;
    this.columns = columns;
    this.columns.map(elem =>
      Object.assign(elem, {
        id: uuid.v4(),
      }),
    );
    Board.instances.push(this);
  }
}

export { Board, IBoard, IBoardParams, IBoardResponse };
