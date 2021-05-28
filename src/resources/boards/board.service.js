/**
 * Board service
 * @module board/service
 */
const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * Return all boards
 * @returns {Promise<Array<Board>>} a promise returns array of boards.
 * {@link module:board/repository}
 */
const getAll = () => boardsRepo.getAll();

/**
 * Creat board.
 * @param {Object} board board object
 * @returns {Promise<Board>} a promise returns instance of Board.
 * {@link module:board/repository}
 */
const CreatBoard = (board) => boardsRepo.CreatBoard(board);

/**
 * Get board by Id.
 * @param {string} id board id.
 * @returns {Promise<Board>} return instance of Board.
 * {@link module:board/repository}
 */
const getBoardByID = (id) => boardsRepo.getBoardByID(id);

/**
 * Update a Board by id and data.
 * @param {string} id board id.
 * @param {Object} board board object
 * @returns {Promise<Object|boolean>} Board object with id or false if board does not exist.
 * {@link module:board/repository}
 */
const UpdateBoard = (id,board) => boardsRepo.UpdateBoard(id,board);

/**
 * Delete a Board by id.
 * @param {string} id - Board id.
 * @returns {Promise<Object|boolean>} object with message or false if board does not exist.
 * {@link module:board/repository}
 */
const DeleteBoard = (id) => {
    tasksRepo.DeleteTask('all',id)
    return boardsRepo.DeleteBoard(id);
}
module.exports = {getAll,CreatBoard,getBoardByID,UpdateBoard,DeleteBoard};
