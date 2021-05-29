import express from 'express';
import * as tasksService from './task.service';
import { ITask, ITaskParams, ITaskResponse } from './task.model';

const router = express.Router({ mergeParams: true });

router
  .route('/:boardId/tasks')
  .get(
    async (req, res): Promise<void> => {
      const id: string = req.params.boardId;
      const tasks: Array<ITask> = await tasksService.getAllTaskByBOARDID(id);
      res.status(200).json(tasks);
    },
  )
  .post(
    async (req, res): Promise<void> => {
      const idBoard: string = req.params.boardId;
      const task: ITaskParams = req.body;
      const createdTask: boolean | ITask = await tasksService.CreatTask(idBoard, task);
      if (!createdTask) res.status(201).json({});
      else res.status(201).json(createdTask);
    },
  );
router
  .route('/:boardId/tasks/:taskId')
  .get(
    async (req, res): Promise<void> => {
      const idBoard: string = req.params.boardId;
      const idTask: string = req.params.taskId;
      const task: ITask | undefined = await tasksService.getTaskByIDandBoardID(idTask, idBoard);
      if (!task) res.status(404).end();
      else res.status(200).json(task);
    },
  )
  .put(
    async (req, res): Promise<void> => {
      const task: ITaskResponse = req.body;
      const idBoard: string = req.params.boardId;
      const idTask: string = req.params.taskId;
      const UpdatedTask: boolean | ITaskResponse = await tasksService.UpdateTask(
        idTask,
        idBoard,
        task,
      );
      if (!UpdatedTask) res.status(404).end();
      else res.status(200).json(UpdatedTask);
    },
  )
  .delete(
    async (req, res): Promise<void> => {
      const idBoard: string = req.params.boardId;
      const idTask: string = req.params.taskId;
      const result: boolean | { message: string } = await tasksService.DeleteTask(idTask, idBoard);
      if (!result) res.status(404).end();
      else res.status(204).json(result);
    },
  );

export { router as taskRouter };
