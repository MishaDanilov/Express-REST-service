const router = require('express').Router({mergeParams:true});
const tasksService = require('./task.service');

router.route('/:boardId/tasks')
.get(async (req,res)=>{
  const id = req.params.boardId
  const tasks = await tasksService.getAllTaskByBOARDID(id);
  res.status(200).json(tasks);
})
.post(async (req, res) => {
    const idBoard = req.params.boardId
    const task = req.body
    const createdTask = await tasksService.CreatTask(idBoard,task);
    res.status(201).json(createdTask);
  });
router.route('/:boardId/tasks/:taskId')
.get(async (req, res) => {
  const idBoard = req.params.boardId
  const idTask = req.params.taskId
  const task = await tasksService.getTaskByIDandBoardID(idTask,idBoard);
  if(!task) res.status(404).end()
  else res.status(200).json(task);
})
.put(async (req, res) => {
    const task = req.body
    const idBoard = req.params.boardId
    const idTask = req.params.taskId
    const UpdatedTask = await tasksService.UpdateTask(idTask,idBoard,task);
    if(!UpdatedTask) res.status(404).end()
    else res.status(200).json(UpdatedTask);
  })
  .delete(async (req, res) => {
    const idBoard = req.params.boardId
    const idTask = req.params.taskId
    const result = await tasksService.DeleteTask(idTask,idBoard);
    if(!result) res.status(404).end()
    else res.status(204).json(result);
  });

module.exports = router;
