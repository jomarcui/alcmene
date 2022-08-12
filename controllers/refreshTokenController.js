const jwt = require('jsonwebtoken');

const users = require('../models/users');

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  users.findOne({ refreshToken: refreshToken }).then((user) => {
    if (!user) return res.sendStatus(403);

    jwt.verify(
      user.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.mobileNumber !== decoded.mobileNumber)
          return res.sendStatus(403);

        const roles = Object.values(user.roles);

        const accessToken = jwt.sign(
          {
            userInfo: {
              roles,
              mobileNumber: decoded.mobileNumber,
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '59s' }
        );

        res.status(200).json({ accessToken });
      }
    );
  });
};

module.exports = handleRefreshToken;
