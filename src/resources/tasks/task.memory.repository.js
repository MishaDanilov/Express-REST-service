const Task = require('./task.model');
const Board = require('../boards/board.model');

const getAllTaskByBOARDID = async (idBoard) => Task.instances.filter(task=>task.boardId === idBoard);

const CreatTask = async (idBoard,task) => {
  const boardExist = Board.instances.find(elem=>elem.id === idBoard);
  if(boardExist) {
    Object.assign(task,{boardId:idBoard});
    return new Task(task);
  }
  
  return {}
  
}

const getTaskByIDandBoardID = async (idTask,idBoard) => Task.instances.find(task=>(task.id === idTask&&task.boardId === idBoard))

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

const setUserIdNull = async (idUser)=>{
  const taskNull = Task.instances.filter(task=>task.userId === idUser)
  taskNull.forEach(elem=>{
    const index = Task.instances.indexOf(elem)
    const newelem = Object.assign(elem,{userId:null})
    Task.instances.splice(index,1,newelem)
  })
}
module.exports = {getAllTaskByBOARDID,CreatTask,getTaskByIDandBoardID,UpdateTask,DeleteTask,setUserIdNull};