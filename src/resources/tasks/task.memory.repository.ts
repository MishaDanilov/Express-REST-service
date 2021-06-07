import { Task, ITask, ITaskParams, ITaskResponse } from './task.model';
import { Board, IBoard } from '../boards/board.model';

const getAllTaskByBOARDID = async (idBoard: string): Promise<Array<ITask>> =>
  Task.instances.filter(task => task.boardId === idBoard);

const CreatTask = async (idBoard: string, task: ITaskParams): Promise<ITask | boolean> => {
  const boardExist: IBoard | undefined = Board.instances.find(elem => elem.id === idBoard);
  if (boardExist) {
    Object.assign(task, { boardId: idBoard });
    return new Task(task);
  }
  return false;
};

const getTaskByIDandBoardID = async (idTask: string, idBoard: string): Promise<ITask | undefined> =>
  Task.instances.find(task => task.id === idTask && task.boardId === idBoard);

const UpdateTask = async (
  idTask: string,
  idBoard: string,
  task: ITaskResponse,
): Promise<ITaskResponse | boolean> => {
  const TaskExist: ITask | undefined = Task.instances.find(
    elem => elem.id === idTask && elem.boardId === idBoard,
  );
  if (TaskExist) {
    const index: number = Task.instances.indexOf(TaskExist);
    Object.assign(task, { id: idTask, boardId: idBoard });
    Task.instances.splice(index, 1, task);
    return task;
  }
  return false;
};

const DeleteTask = async (
  idTask: string,
  idBoard: string,
): Promise<{ message: string } | boolean> => {
  if (idTask === 'all') {
    const taskAll: Array<ITask> = Task.instances.filter(task => task.boardId === idBoard);
    taskAll.forEach(elem => {
      const indexAll: number = Task.instances.indexOf(elem);
      Task.instances.splice(indexAll, 1);
    });
    return { message: 'The tasks have been deleted' };
  }

  const TaskExist: ITask | undefined = Task.instances.find(
    task => task.id === idTask && task.boardId === idBoard,
  );
  if (TaskExist) {
    const index: number = Task.instances.indexOf(TaskExist);
    Task.instances.splice(index, 1);
    return { message: 'The task has been deleted' };
  }
  return false;
};

const setUserIdNull = async (idUser: string): Promise<void> => {
  const taskNull: Array<ITask> = Task.instances.filter(task => task.userId === idUser);
  taskNull.forEach(elem => {
    const index: number = Task.instances.indexOf(elem);
    const newelem: ITask & { userId: null } = Object.assign(elem, { userId: null });
    Task.instances.splice(index, 1, newelem);
  });
};
export {
  getAllTaskByBOARDID,
  CreatTask,
  getTaskByIDandBoardID,
  UpdateTask,
  DeleteTask,
  setUserIdNull,
};
