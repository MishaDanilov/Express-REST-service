import { Board, IBoard, IBoardParams, IBoardResponse } from './board.model';

const getAll = async (): Promise<Array<IBoard>> => Board.instances;

const CreatBoard = async (board: IBoardParams): Promise<IBoard> => new Board(board);

const getBoardByID = async (id: string | undefined): Promise<IBoard | undefined> =>
  Board.instances.find(board => board.id === id);

const UpdateBoard = async (
  id: string | undefined,
  board: IBoardResponse,
): Promise<boolean | IBoardResponse> => {
  const boardExist: IBoard | undefined = Board.instances.find(elem => elem.id === id);
  if (boardExist) {
    const index: number = Board.instances.indexOf(boardExist);
    Object.assign(board, { id });
    Board.instances.splice(index, 1, board);
    return board;
  }
  return false;
};

const DeleteBoard = async (id: string | undefined): Promise<boolean | { message: string }> => {
  const boardExist: IBoard | undefined = Board.instances.find(elem => elem.id === id);
  if (boardExist) {
    const index: number = Board.instances.indexOf(boardExist);
    Board.instances.splice(index, 1);
    return { message: 'The board has been deleted' };
  }
  return false;
};

export { getAll, CreatBoard, getBoardByID, UpdateBoard, DeleteBoard };
