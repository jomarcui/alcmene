const router = require('express').Router();
const Roles = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');

const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require('../../controllers/usersController');

router
  .route('/')
  .get(verifyRoles(Roles.ADMIN), getAllUsers)
  .post(verifyRoles(Roles.ADMIN), createUser);

router
  .route('/:id')
  .delete(verifyRoles(Roles.ADMIN), deleteUser)
  .get(verifyRoles(Roles.ADMIN), getUserById)
  .put(verifyRoles(Roles.ADMIN), updateUser);

module.exports = router;
