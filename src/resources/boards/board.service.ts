import * as boardsRepo from './board.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';
import { IBoard, IBoardParams, IBoardResponse } from './board.model';

const getAll = (): Promise<Array<IBoard>> => boardsRepo.getAll();

const CreatBoard = (board: IBoardParams): Promise<IBoard> => boardsRepo.CreatBoard(board);

const getBoardByID = (id: string | undefined): Promise<IBoard | undefined> =>
  boardsRepo.getBoardByID(id);

const UpdateBoard = (
  id: string | undefined,
  board: IBoardResponse,
): Promise<boolean | IBoardResponse> => boardsRepo.UpdateBoard(id, board);

const DeleteBoard = (id: string | undefined): Promise<boolean | { message: string }> => {
  tasksRepo.DeleteTask('all', id);
  return boardsRepo.DeleteBoard(id);
};
export { getAll, CreatBoard, getBoardByID, UpdateBoard, DeleteBoard };
