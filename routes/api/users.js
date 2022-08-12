const router = require('express').Router();
const Roles = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');

const {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require('../../controllers/usersController');

router
  .route('/')
  .delete(verifyRoles(Roles.ADMIN), deleteUser)
  .get(verifyRoles(Roles.ADMIN), getAllUsers)
  .post(verifyRoles(Roles.ADMIN),createNewUser)
  .put(verifyRoles(Roles.ADMIN), updateUser);

router.route('/:id').get(getUserById);

module.exports = router;
