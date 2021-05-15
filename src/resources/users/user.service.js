const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const CreatUser = (user) => usersRepo.CreatUser(user);

const getUserByID = (id) => usersRepo.getUserByID(id);

const UpdateUser = (id,user) => usersRepo.UpdateUser(id,user);

const DeleteUser = (id) => {
    tasksRepo.setUserIdNull(id)
    return usersRepo.DeleteUser(id);
}

module.exports = { getAll,CreatUser,getUserByID,UpdateUser,DeleteUser };
