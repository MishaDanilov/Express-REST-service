const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const CreatBoard = (board) => boardsRepo.CreatBoard(board);

const getBoardByID = (id) => boardsRepo.getBoardByID(id);

const UpdateBoard = (id,board) => boardsRepo.UpdateBoard(id,board);

const DeleteBoard = (id) => {
    tasksRepo.DeleteTask('all',id)
    return boardsRepo.DeleteBoard(id);
}
module.exports = {getAll,CreatBoard,getBoardByID,UpdateBoard,DeleteBoard};
