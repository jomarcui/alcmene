const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);

    const allowedRolesArray = [...allowedRoles];

    const hasRole = req.roles.map(role => allowedRolesArray.includes(role)).find(val => val);

    if (!hasRole) return res.sendStatus(401);

    next();
  }
}

module.exports = verifyRoles;
