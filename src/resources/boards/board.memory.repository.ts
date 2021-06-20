import { v4 } from 'uuid';
import { Column } from '../columns/column.model';
import { Board, IBoardParams, IBoardResponse, IBoardParamsForUpdate } from './board.model';

const getAll = async (): Promise<Array<IBoardResponse>> => {
  const result = await Board.findAll({ raw: true });
  const boardsObject: Array<IBoardResponse> = result.map(boardElem => {
    return {
      id: boardElem.id,
      title: boardElem.title,
      columns: [],
    };
  });
  const getBoardSync = async () => {
    const map = await Promise.all(
      boardsObject.map(async board => {
        const columns = await Column.findAll({ where: { BoardId: board.id }, raw: true });
        const columnsNew = columns.map(column => {
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
  };

  const boardsObjectNew = await getBoardSync();
  return boardsObjectNew;
};

const CreatBoard = async (param: IBoardParams): Promise<IBoardResponse> => {
  const createBoard = { id: v4(), ...param };
  const board = await Board.create({
    id: createBoard.id,
    title: createBoard.title,
  });
  const createColumnSync = () => {
    return new Promise((resolve: (value: void) => void, reject) => {
      try {
        param.columns.forEach(async (column, index, arr) => {
          await board.createColumn({ id: v4(), ...column });
          if (arr.length === index + 1) resolve();
        });
      } catch (error) {
        reject();
      }
    });
  };
  await createColumnSync();
  const columns = await board.getColumns();
  const columnsNew = columns.map(column => {
    return { id: column.id, title: column.title, order: column.order };
  });
  const result = {
    id: board.id,
    title: board.title,
    columns: columnsNew,
  };
  return result;
};

const getBoardByID = async (id: string | undefined): Promise<IBoardResponse | null> => {
  const board = await Board.findByPk(id);
  if (board) {
    const columns = await board.getColumns();
    const columnsNew = columns.map(column => {
      return { id: column.id, title: column.title, order: column.order };
    });
    const result = { id: board.id, title: board.title, columns: columnsNew };
    return result;
  }
  return null;
};

const UpdateBoard = async (
  id: string | undefined,
  board: IBoardParamsForUpdate,
): Promise<[number, Board[]]> => {
  const { title } = board;
  const result = await Board.update({ title }, { where: { id } });
  const boardInst = await Board.findByPk(id);
  await Column.destroy({ where: { BoardId: id } });
  board.columns.forEach(async elemColumn => {
    boardInst?.createColumn(elemColumn);
  });

  return result;
};

const DeleteBoard = async (id: string | undefined): Promise<number> => {
  const result = await Board.destroy({ where: { id } });
  return result;
};

export { getAll, CreatBoard, getBoardByID, UpdateBoard, DeleteBoard };
