import * as tasksRepo from './task.memory.repository';
import { ITask, ITaskParams, ITaskResponse } from './task.model';

const getAllTaskByBOARDID = (id: string | undefined): Promise<ITask[]> =>
  tasksRepo.getAllTaskByBOARDID(id);

const CreatTask = (idBoard: string | undefined, task: ITaskParams): Promise<ITask | boolean> =>
  tasksRepo.CreatTask(idBoard, task);

const getTaskByIDandBoardID = (
  idTask: string | undefined,
  idBoard: string | undefined,
): Promise<ITask | undefined> => tasksRepo.getTaskByIDandBoardID(idTask, idBoard);

const UpdateTask = (
  idTask: string | undefined,
  idBoard: string | undefined,
  task: ITaskResponse,
): Promise<boolean | ITaskResponse> => tasksRepo.UpdateTask(idTask, idBoard, task);

const DeleteTask = (
  idTask: string | undefined,
  idBoard: string | undefined,
): Promise<boolean | { message: string }> => tasksRepo.DeleteTask(idTask, idBoard);

export { getAllTaskByBOARDID, CreatTask, getTaskByIDandBoardID, UpdateTask, DeleteTask };
