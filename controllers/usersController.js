const users = require('../models/users');

const createNewUser = (req, res) => {
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
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const getAllUsers = (_req, res) => {
  users
    .find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const updateUser = (req, res) => {
  const { firstName, id, lastName, mobileNumber, password } = req.body;

  users
    .findById(id)
    .then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.mobileNumber = mobileNumber;
      user.password = password;

      user
        .save()
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const deleteUser = (req, res) => {
  const { id } = req.body;

  users
    .findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  users
    .findById(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
};
