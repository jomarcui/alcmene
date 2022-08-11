const bcrypt = require('bcrypt');

const users = require('../models/users');

const handleLogin = (req, res) => {
  const { mobileNumber, password } = req.body;

  users.findOne({ mobileNumber: mobileNumber }).then(async (user) => {
    if (!user) return res.sendStatus(401);
    
    const isPasswordsMatched = await bcrypt.compare(password, user.password);

    if (isPasswordsMatched) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
};

module.exports = {
  handleLogin
}
