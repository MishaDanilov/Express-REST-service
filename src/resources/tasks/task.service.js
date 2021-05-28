const tasksRepo = require('./task.memory.repository');

const getAllTaskByBOARDID = (id) => tasksRepo.getAllTaskByBOARDID(id);

const CreatTask = (idBoard,task) => tasksRepo.CreatTask(idBoard,task);

const getTaskByIDandBoardID = (idTask,idBoard) => tasksRepo.getTaskByIDandBoardID(idTask,idBoard);

const UpdateTask = (idTask,idBoard,task) => tasksRepo.UpdateTask(idTask,idBoard,task);

const DeleteTask = (idTask,idBoard) => tasksRepo.DeleteTask(idTask,idBoard);

module.exports = {getAllTaskByBOARDID,CreatTask,getTaskByIDandBoardID,UpdateTask,DeleteTask};
