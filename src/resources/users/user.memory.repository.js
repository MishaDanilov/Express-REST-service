/**
 * User repository
 * @module user/repository
 */
const User = require('./user.model');

/**
 * Returns all Users.
 * @returns {Promise<Array<User>>} a promise returns array of users.
 */
const getAll = async () => User.instances

/**
 * Creat user.
 * @param {Object} user user object
 * @returns {Promise<User>} a promise returns instance of User.
 */
const CreatUser = async (user) => new User(user)

/**
 * Get User by Id.
 * @param {string} id user id.
 * @returns {Promise<User>} return instance of User.
 */
const getUserByID = async (id) => User.instances.find(user=>user.id === id)

/**
 * Update a User by id and data.
 * @param {string} id User id.
 * @param {Object} user user object
 * @returns {Promise<Object|boolean>} User object with id or false if user does not exist.
 */
const UpdateUser = async (id,user) => {
  const userExist = User.instances.find(elem=>elem.id === id)
  if(userExist) {
    const index = User.instances.indexOf(userExist)
    Object.assign(user,{id})
    User.instances.splice(index,1,user)
    return user
  }
  return false
}

/**
 * Delete a User by id.
 * @param {string} id - User id.
 * @returns {Promise<Object|boolean>} object with message or false if user does not exist.
 */
const DeleteUser = async (id) => {
  const userExist = User.instances.find(elem=>elem.id === id)
  if(userExist) {
    const index = User.instances.indexOf(userExist)
    User.instances.splice(index,1)
    return {message:'The user has been deleted'}
  }
  return false
}
module.exports = {getAll,CreatUser,getUserByID,UpdateUser,DeleteUser};