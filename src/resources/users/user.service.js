/**
 * User service
 * @module user/service
 */
const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * Return all users
 * @returns {Promise<Array<User>>} promise returns to array of users
 * {@link module:user/repository}
 */
const getAll = () => usersRepo.getAll();

/**
 * Creat one user
 * @param {Object} user user object
 * @returns {Promise<User>} a promise returns instance of User.
 * {@link module:user/repository}
 */
const CreatUser = (user) => usersRepo.CreatUser(user);

/**
 * Return one user by id
 * @param {String} id user id
 * @returns {Promise<User>} return instance of User.
 * {@link module:user/repository}
 */
const getUserByID = (id) => usersRepo.getUserByID(id);

/**
 * Update one user by id
 * @param {String} id user id
 * @param {Object} user user object
 * @returns {Promise<Object|boolean>} User object with id or false if user does not exist.
 * {@link module:user/repository}
 */
const UpdateUser = (id,user) => usersRepo.UpdateUser(id,user);

/**
 * Delete one user by id
 * @param {String} id user id
 * @returns {Promise<Object|boolean>} object with message or false if user does not exist.
 * {@link module:user/repository}
 */
const DeleteUser = (id) => {
    tasksRepo.setUserIdNull(id)
    return usersRepo.DeleteUser(id);
}

module.exports = { getAll,CreatUser,getUserByID,UpdateUser,DeleteUser };
