const User = require('./user.model');

const getAll = async () => User.instances

const CreatUser = async (user) => new User(user)

const getUserByID = async (id) => User.instances.find(user=>user.id === id)

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