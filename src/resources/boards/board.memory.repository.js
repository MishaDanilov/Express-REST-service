const Board = require('./board.model');

const getAll = async () => Board.instances

const CreatBoard = async (board) => new Board(board)

const getBoardByID = async (id) => Board.instances.find(board => board.id === id)

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