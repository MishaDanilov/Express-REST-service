import { v4 } from 'uuid';
import { Task, ITaskResponse, ITaskParams } from './task.model';
import { Board } from '../boards/board.model';

const getAllTaskByBOARDID = async (
  idBoard: string | undefined,
): Promise<Array<ITaskResponse> | null> => {
  const result = await Board.findByPk(idBoard);
  if (result) {
    const tasks = await result.getTasks();
    return tasks;
  }
  return null;
};

const CreatTask = async (
  idBoard: string | undefined,
  task: ITaskParams,
): Promise<ITaskResponse | null> => {
  const result = await Board.findByPk(idBoard);
  if (result) {
    const tasks = await result.createTask({ ...task, id: v4() });
    return tasks;
  }
  return null;
};

const getTaskByIDandBoardID = async (
  idTask: string | undefined,
  idBoard: string | undefined,
): Promise<ITaskResponse | null> => {
  const result = await Task.findOne({ where: { id: idTask, boardId: idBoard } });
  return result;
};

const UpdateTask = async (
  idTask: string | undefined,
  idBoard: string | undefined,
  task: ITaskParams,
): Promise<[number, Task[]]> => {
  const result = await Task.update(task, { where: { id: idTask, boardId: idBoard } });
  return result;
};

const DeleteTask = async (
  idTask: string | undefined,
  idBoard: string | undefined,
): Promise<number> => {
  const result = await Task.destroy({ where: { id: idTask, boardId: idBoard } });
  return result;
};

export { getAllTaskByBOARDID, CreatTask, getTaskByIDandBoardID, UpdateTask, DeleteTask };
