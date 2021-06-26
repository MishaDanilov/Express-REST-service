import express from 'express';
import { IBoard, IBoardParams, Board, IBoardParamsForUpdate } from './board.model';
import * as boardsService from './board.service';
import { errorCatch } from '../../common/errorCatch';
import { ErrorWithStatus } from '../../middlewares/errorHandling';

const router = express.Router();

router
  .route('/')
  .get(
    errorCatch(
      async (_, res): Promise<void> => {
        const board: IBoard[] = await boardsService.getAll();
        res.status(200).json(board);
      },
    ),
  )
  .post(
    errorCatch(
      async (req, res): Promise<void> => {
        const board: IBoardParams = req.body;
        const createdBoard: IBoard = await boardsService.CreatBoard(board);
        res.status(201).json(createdBoard);
      },
    ),
  );
router
  .route('/:id')
  .get(
    errorCatch(
      async (req, res): Promise<void> => {
        const { id } = req.params;
        const board: IBoard | null = await boardsService.getBoardByID(id);
        if (!board) throw new ErrorWithStatus(404, 'Board not found');
        else res.status(200).json(board);
      },
    ),
  )
  .put(
    errorCatch(
      async (req, res): Promise<void> => {
        const board: IBoardParamsForUpdate = req.body;
        const { id } = req.params;
        const UpdatedBoard: [number, Board[]] = await boardsService.UpdateBoard(id, board);
        if (!UpdatedBoard[0]) throw new ErrorWithStatus(404, 'Board not found');
        else res.status(200).json({ status: true, message: 'Доска обновлена.' });
      },
    ),
  )
  .delete(
    errorCatch(
      async (req, res): Promise<void> => {
        const { id } = req.params;
        const result: number = await boardsService.DeleteBoard(id);
        if (!result) throw new ErrorWithStatus(404, 'Board not found');
        else res.status(200).json({ status: true, message: 'Доска удалена.' });
      },
    ),
  );

export { router as boardRouter };
