const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
.get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
})
.post(async (req, res) => {
  const user = req.body
  const createdUser = await usersService.CreatUser(user);
  res.status(201).json(User.toResponse(createdUser));
});
router.route('/:id')
.get(async (req, res) => {
  const {id} = req.params
  const user = await usersService.getUserByID(id);
  if(!user) res.status(404).end()
  else res.status(200).json(User.toResponse(user));
})
.put(async (req, res) => {
  const user = req.body
  const {id} = req.params
  const UpdatedUser = await usersService.UpdateUser(id,user);
  if(!UpdatedUser) res.status(404).end()
  else res.status(200).json(User.toResponse(UpdatedUser));
})
.delete(async (req, res) => {
  const {id} = req.params
  const result = await usersService.DeleteUser(id);
  if(!result) res.status(404).end()
  else res.status(204).json(result);
});
module.exports = router;
