const router = require('express').Router();

const {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require('../../controllers/usersController');

router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id').get(getUserById);

module.exports = router;
