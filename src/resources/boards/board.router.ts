import express from 'express';
import { IBoard, IBoardParams, IBoardResponse } from './board.model';
import * as boardsService from './board.service';

const router = express.Router();

router
  .route('/')
  .get(
    async (_, res): Promise<void> => {
      const board: IBoard[] = await boardsService.getAll();
      res.status(200).json(board);
    },
  )
  .post(
    async (req, res): Promise<void> => {
      const board: IBoardParams = req.body;
      const createdBoard: IBoard = await boardsService.CreatBoard(board);
      res.status(201).json(createdBoard);
    },
  );
router
  .route('/:id')
  .get(
    async (req, res): Promise<void> => {
      const { id } = req.params;
      const board: IBoard | undefined = await boardsService.getBoardByID(id);
      if (!board) res.status(404).end();
      else res.status(200).json(board);
    },
  )
  .put(
    async (req, res): Promise<void> => {
      const board: IBoardResponse = req.body;
      const { id } = req.params;
      const UpdatedBoard: boolean | IBoardResponse = await boardsService.UpdateBoard(id, board);
      if (!UpdatedBoard) res.status(404).end();
      else res.status(200).json(UpdatedBoard);
    },
  )
  .delete(
    async (req, res): Promise<void> => {
      const { id } = req.params;
      const result: boolean | { message: string } = await boardsService.DeleteBoard(id);
      if (!result) res.status(404).end();
      else res.status(204).json(result);
    },
  );

export { router as boardRouter };