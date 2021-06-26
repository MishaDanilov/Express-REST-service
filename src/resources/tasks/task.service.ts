import * as tasksRepo from './task.memory.repository';
import { Task, ITaskParams, ITaskResponse } from './task.model';

const getAllTaskByBOARDID = (id: string | undefined): Promise<Array<ITaskResponse> | null> =>
  tasksRepo.getAllTaskByBOARDID(id);

const CreatTask = (idBoard: string | undefined, task: ITaskParams): Promise<ITaskResponse | null> =>
  tasksRepo.CreatTask(idBoard, task);

const getTaskByIDandBoardID = (
  idTask: string | undefined,
  idBoard: string | undefined,
): Promise<ITaskResponse | null> => tasksRepo.getTaskByIDandBoardID(idTask, idBoard);

const UpdateTask = (
  idTask: string | undefined,
  idBoard: string | undefined,
  task: ITaskResponse,
): Promise<[number, Task[]]> => tasksRepo.UpdateTask(idTask, idBoard, task);

const DeleteTask = (idTask: string | undefined, idBoard: string | undefined): Promise<number> =>
  tasksRepo.DeleteTask(idTask, idBoard);

export { getAllTaskByBOARDID, CreatTask, getTaskByIDandBoardID, UpdateTask, DeleteTask };
