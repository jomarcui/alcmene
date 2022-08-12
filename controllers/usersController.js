const users = require('../models/users');

const createUser = (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;

  const newUser = new users({
    firstName,
    lastName,
    mobileNumber,
    password,
  });

  newUser
    .save()
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(400).json({ err }));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  users
    .findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json({ err }));
};

const getAllUsers = (_req, res) => {
  users
    .find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ err }));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  users
    .findById(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ err }));
};

const updateUser = (req, res) => {
  const { id } = req.params;

  users
    .findById(id)
    .then((user) => {
      const { firstName, lastName, mobileNumber, password } = req.body;

      user.firstName = firstName;
      user.lastName = lastName;
      user.mobileNumber = mobileNumber;
      user.password = password;

      user
        .save()
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
};
