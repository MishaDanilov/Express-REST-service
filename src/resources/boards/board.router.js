const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/')
.get(async (req,res)=>{
  const board = await boardsService.getAll();
  res.status(200).json(board);
})
.post(async (req, res) => {
    const board = req.body
    const createdBoard = await boardsService.CreatBoard(board);
    res.status(201).json(createdBoard);
  });
router.route('/:id')
.get(async (req, res) => {
  const {id} = req.params
  const board = await boardsService.getBoardByID(id);
  if(!board) res.status(404).end()
  else res.status(200).json(board);
})
.put(async (req, res) => {
    const board = req.body
    const {id} = req.params
    const UpdatedBoard = await boardsService.UpdateBoard(id,board);
    if(!UpdatedBoard) res.status(404).end()
    else res.status(200).json(UpdatedBoard);
  })
  .delete(async (req, res) => {
    const {id} = req.params
    const result = await boardsService.DeleteBoard(id);
    if(!result) res.status(404).end()
    else res.status(204).json(result);
  });

module.exports = router;
