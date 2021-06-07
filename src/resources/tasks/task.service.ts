import * as tasksRepo from './task.memory.repository';
import { ITask, ITaskParams, ITaskResponse } from './task.model';

const getAllTaskByBOARDID = (id: string): Promise<ITask[]> => tasksRepo.getAllTaskByBOARDID(id);

const CreatTask = (idBoard: string, task: ITaskParams): Promise<ITask | boolean> =>
  tasksRepo.CreatTask(idBoard, task);

const getTaskByIDandBoardID = (idTask: string, idBoard: string): Promise<ITask | undefined> =>
  tasksRepo.getTaskByIDandBoardID(idTask, idBoard);

const UpdateTask = (
  idTask: string,
  idBoard: string,
  task: ITaskResponse,
): Promise<boolean | ITaskResponse> => tasksRepo.UpdateTask(idTask, idBoard, task);

const DeleteTask = (idTask: string, idBoard: string): Promise<boolean | { message: string }> =>
  tasksRepo.DeleteTask(idTask, idBoard);

export { getAllTaskByBOARDID, CreatTask, getTaskByIDandBoardID, UpdateTask, DeleteTask };
