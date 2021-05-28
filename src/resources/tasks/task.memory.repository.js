/**
 * Task repository
 * @module task/repository
 */
const Task = require('./task.model');
const Board = require('../boards/board.model');

/**
 * Returns all Tasks by idBoard.
 * @param {string} idBoard board id
 * @returns {Promise<Array<Task>>} a promise returns array of tasks.
 */
const getAllTaskByBOARDID = async (idBoard) => Task.instances.filter(task=>task.boardId === idBoard);

/**
 * Creat task.
 * @param {Object} task task object
 * @param {string} idBoard board id
 * @returns {Promise<Task>} a promise returns instance of Task.
 */
const CreatTask = async (idBoard,task) => {
  const boardExist = Board.instances.find(elem=>elem.id === idBoard);
  if(boardExist) {
    Object.assign(task,{boardId:idBoard});
    return new Task(task);
  }
  
  return {}
  
}

/**
 * Returns Task by idBoard and TaskBy.
 * @param {string} idBoard board id
 * @param {string} idTask task id
 * @returns {Promise<Task>} a promise returns instance of task.
 */
const getTaskByIDandBoardID = async (idTask,idBoard) => Task.instances.find(task=>(task.id === idTask&&task.boardId === idBoard))

/**
 * Update a task by idTask and idBoard and object of task.
 * @param {string} idBoard board id
 * @param {string} idTask task id
 * @param {Object} task task object
 * @returns {Promise<Object|boolean>} Task object with id or false if task does not exist.
 */
const UpdateTask = async (idTask,idBoard,task) => {
  const TaskExist = Task.instances.find(elem=>(elem.id === idTask&&elem.boardId === idBoard))
  if(TaskExist) {
    const index = Task.instances.indexOf(TaskExist)
    Object.assign(task,{id:idTask,boardId:idBoard})
    Task.instances.splice(index,1,task)
    return task
  }
  return false
}

/**
 * Delete a task by idTask and idBoard.
 * @param {string} idBoard board id
 * @param {string} idTask task id
 * @returns {Promise<Object|boolean>} object with message or false if task does not exist.
 */
const DeleteTask = async (idTask,idBoard) => {
  if(idTask==='all') {
    const taskAll = Task.instances.filter(task=>task.boardId === idBoard)
    taskAll.forEach(elem=>{
      const indexAll = Task.instances.indexOf(elem)
      Task.instances.splice(indexAll,1)
    })
    return {message:'The tasks have been deleted'}
  }
  
  const TaskExist = Task.instances.find(task=>(task.id === idTask&&task.boardId === idBoard))
  if(TaskExist) {
    const index = Task.instances.indexOf(TaskExist)
    Task.instances.splice(index,1)
    return {message:'The task has been deleted'}
  }
  return false

}

/**
 * Set UserId as Null in instance of Task.
 * @param {string} idUser user id
 * @returns {Promise} return void promise
 */
const setUserIdNull = async (idUser)=>{
  const taskNull = Task.instances.filter(task=>task.userId === idUser)
  taskNull.forEach(elem=>{
    const index = Task.instances.indexOf(elem)
    const newelem = Object.assign(elem,{userId:null})
    Task.instances.splice(index,1,newelem)
  })
}
module.exports = {getAllTaskByBOARDID,CreatTask,getTaskByIDandBoardID,UpdateTask,DeleteTask,setUserIdNull};