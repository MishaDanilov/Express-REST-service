/**
 * User repository
 * @module board/repository
 */
const Board = require('./board.model');

/**
 * Returns all boards.
 * @returns {Promise<Array<Board>>} a promise returns array of boards.
 */
const getAll = async () => Board.instances

/**
 * Creat board.
 * @param {Object} board board object
 * @returns {Promise<Board>} a promise returns instance of Board.
 */
const CreatBoard = async (board) => new Board(board)

/**
 * Get board by Id.
 * @param {string} id board id.
 * @returns {Promise<Board>} return instance of Board.
 */
const getBoardByID = async (id) => Board.instances.find(board => board.id === id)

/**
 * Update a Board by id and data.
 * @param {string} id board id.
 * @param {Object} board board object
 * @returns {Promise<Object|boolean>} Board object with id or false if board does not exist.
 */
const UpdateBoard = async (id, board) => {
  const boardExist = Board.instances.find(elem => elem.id === id)
  if (boardExist) {
    const index = Board.instances.indexOf(boardExist)
    Object.assign(board, {
      id
    })
    Board.instances.splice(index, 1, board)
    return board
  } return false
}

/**
 * Delete a Board by id.
 * @param {string} id - Board id.
 * @returns {Promise<Object|boolean>} object with message or false if board does not exist.
 */
const DeleteBoard = async (id) => {
  const boardExist = Board.instances.find(elem => elem.id === id)
  if (boardExist) {
    const index = Board.instances.indexOf(boardExist)
    Board.instances.splice(index, 1)
    return {
      message: 'The board has been deleted'
    }
  } return false
}

module.exports = {
  getAll,
  CreatBoard,
  getBoardByID,
  UpdateBoard,
  DeleteBoard
};