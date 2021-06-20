import * as boardsRepo from './board.memory.repository';
import { IBoard, IBoardParams, IBoardResponse, IBoardParamsForUpdate, Board } from './board.model';

const getAll = (): Promise<Array<IBoardResponse>> => boardsRepo.getAll();

const CreatBoard = (board: IBoardParams): Promise<IBoard> => boardsRepo.CreatBoard(board);

const getBoardByID = (id: string | undefined): Promise<IBoardResponse | null> =>
  boardsRepo.getBoardByID(id);

const UpdateBoard = (
  id: string | undefined,
  board: IBoardParamsForUpdate,
): Promise<[number, Board[]]> => boardsRepo.UpdateBoard(id, board);

const DeleteBoard = (id: string | undefined): Promise<number> => {
  return boardsRepo.DeleteBoard(id);
};
export { getAll, CreatBoard, getBoardByID, UpdateBoard, DeleteBoard };
