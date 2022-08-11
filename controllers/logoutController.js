const users = require('../models/users');

const handleLogout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  users.findOne({ refreshToken: refreshToken }).then((user) => {
    if (!user) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });

      return res.sendStatus(204);
    }

    user.refreshToken = null;

    user.save().then(() => {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.sendStatus(204);
    });
  });
};

module.exports = handleLogout;
