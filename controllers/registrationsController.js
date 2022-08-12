const bcrypt = require('bcrypt');

const Roles = require('../config/roles');
const users = require('../models/users');

const handleNewUser = (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;

  users.find({ mobileNumber: mobileNumber }).then(async (user) => {
    if (user.length) return res.sendStatus(409);

    const newUser = new users({
      firstName,
      lastName,
      mobileNumber,
      password,
      roles: [Roles.USER]
    });

    try {
      await newUser.validate();

      const passwordHashed = await bcrypt.hash(password, 10);
      newUser.password = passwordHashed;

      newUser
        .save()
        .then(() => res.sendStatus(201))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    } catch (err) {
      throw err;
    }
  });
};

module.exports = { handleNewUser };
