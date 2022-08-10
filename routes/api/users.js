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

// router.route('/auth').post(async (req, res) => {
//   await users
//     .findOne({ email: req.body.email, password: req.body.password })
//     .then((user) => {
//       return res.json(user);
//     })
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

module.exports = router;
