const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/users');

const handleLogin = (req, res) => {
  const { mobileNumber, password } = req.body;

  users.findOne({ mobileNumber: mobileNumber }).then(async (user) => {
    if (!user) return res.sendStatus(401);

    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (isPasswordsMatch) {
      const roles = Object.values(user.roles);

      const accessToken = jwt.sign(
        {
          userInfo: {
            roles,
            mobileNumber: user.mobileNumber,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '59s' }
      );

      const refreshToken = jwt.sign(
        { mobileNumber: user.mobileNumber },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      user.refreshToken = refreshToken;

      user.save().then(() => {
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'None',
          secure: true,
        });
        res.status(200).json({ accessToken });
      });
    } else {
      res.sendStatus(401);
    }
  });
};

module.exports = {
  handleLogin,
};
