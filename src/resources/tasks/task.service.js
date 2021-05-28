/**
 * Task service
 * @module task/service
 */
const tasksRepo = require('./task.memory.repository');

/**
 * Returns all Tasks by idBoard.
 * @param {string} idBoard board id
 * @returns {Promise<Array<Task>>} a promise returns array of tasks.
 * {@link module:task/repository}
 */
const getAllTaskByBOARDID = (id) => tasksRepo.getAllTaskByBOARDID(id);

/**
 * Creat task.
 * @param {Object} task task object
 * @param {string} idBoard board id
 * @returns {Promise<Task>} a promise returns instance of Task.
 * {@link module:task/repository}
 */
const CreatTask = (idBoard,task) => tasksRepo.CreatTask(idBoard,task);

/**
 * Returns Task by idBoard and TaskBy.
 * @param {string} idBoard board id
 * @param {string} idTask task id
 * @returns {Promise<Task>} a promise returns instance of task.
 * {@link module:task/repository}
 */
const getTaskByIDandBoardID = (idTask,idBoard) => tasksRepo.getTaskByIDandBoardID(idTask,idBoard);

/**
 * Update a task by idTask and idBoard and object of task.
 * @param {string} idBoard board id
 * @param {string} idTask task id
 * @param {Object} task task object
 * @returns {Promise<Object|boolean>} Task object with id or false if task does not exist.
 * {@link module:task/repository}
 */
const UpdateTask = (idTask,idBoard,task) => tasksRepo.UpdateTask(idTask,idBoard,task);

/**
 * Delete a task by idTask and idBoard.
 * @param {string} idBoard board id
 * @param {string} idTask task id
 * @returns {Promise<Object|boolean>} object with message or false if task does not exist.
 * {@link module:task/repository}
 */
const DeleteTask = (idTask,idBoard) => tasksRepo.DeleteTask(idTask,idBoard);

module.exports = {getAllTaskByBOARDID,CreatTask,getTaskByIDandBoardID,UpdateTask,DeleteTask};
