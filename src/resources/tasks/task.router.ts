import express from 'express';
import * as tasksService from './task.service';
import { Task, ITaskParams, ITaskResponse } from './task.model';
import { errorCatch } from '../../common/errorCatch';
import { ErrorWithStatus } from '../../middlewares/errorHandling';

const router = express.Router({ mergeParams: true });

router
  .route('/:boardId/tasks')
  .get(
    errorCatch(
      async (req, res): Promise<void> => {
        const id: string | undefined = req.params['boardId'];
        const tasks: Array<ITaskResponse> | null = await tasksService.getAllTaskByBOARDID(id);
        res.status(200).json(tasks);
      },
    ),
  )
  .post(
    errorCatch(
      async (req, res): Promise<void> => {
        const idBoard: string | undefined = req.params['boardId'];
        const task: ITaskParams = req.body;
        const createdTask: ITaskResponse | null = await tasksService.CreatTask(idBoard, task);
        if (!createdTask) res.status(201).json({});
        else res.status(201).json(createdTask);
      },
    ),
  );
router
  .route('/:boardId/tasks/:taskId')
  .get(
    errorCatch(
      async (req, res): Promise<void> => {
        const idBoard: string | undefined = req.params['boardId'];
        const idTask: string | undefined = req.params['taskId'];
        const task: ITaskResponse | null = await tasksService.getTaskByIDandBoardID(
          idTask,
          idBoard,
        );
        if (!task) throw new ErrorWithStatus(404, 'Task not found');
        else res.status(200).json(task);
      },
    ),
  )
  .put(
    errorCatch(
      async (req, res): Promise<void> => {
        const task: ITaskResponse = req.body;
        const idBoard: string | undefined = req.params['boardId'];
        const idTask: string | undefined = req.params['taskId'];
        const UpdatedTask: [number, Task[]] = await tasksService.UpdateTask(idTask, idBoard, task);
        if (!UpdatedTask) throw new ErrorWithStatus(404, 'Task not found');
        else res.status(200).json({ status: true, message: 'Задача обновлена.' });
      },
    ),
  )
  .delete(
    errorCatch(
      async (req, res): Promise<void> => {
        const idBoard: string | undefined = req.params['boardId'];
        const idTask: string | undefined = req.params['taskId'];
        const result: number = await tasksService.DeleteTask(idTask, idBoard);
        if (!result) throw new ErrorWithStatus(404, 'Task not found');
        else res.status(204).json({ status: true, message: 'Задача удалена.' });
      },
    ),
  );

export { router as taskRouter };
