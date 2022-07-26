const router = require('express').Router();
let teams = require('../models/teams.model');

router.route('/').get((_req, res) => {
  teams
    .find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { league_id, name, sport_id } = req.body;

  const newTeam = new users({
    league_id,
    name,
    sport_id,
  });

  newTeam
    .save()
    .then((team) => res.status(201).json(team))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// router.route('/update/:id').post((req, res) => {
//   const { id } = req.params;

//   users
//     .findById(id)
//     .then((user) => {
//       const { dateCreated, email, lastLogin, password, username } = req.body;

//       user.dateCreated = dateCreated;
//       user.email = email;
//       user.lastLogin = lastLogin;
//       user.password = password;
//       user.username = username;

//       user
//         .save()
//         .then((_user) => res.json('User was updated.'))
//         .catch((err) => res.status(400).json(`Error: ${err}`));
//     })
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

// router.route('/:id').get((req, res) => {
//   const { id } = req.params;

//   users
//     .findById(id)
//     .then((user) => res.json(user))
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

// router.route('/:id').delete((req, res) => {
//   const { id } = req.params;

//   users
//     .findByIdAndDelete(id)
//     .then((user) => res.json('User was deleted.'))
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

// router.route('/auth').post(async (req, res) => {
//   await users
//     .findOne({ email: req.body.email, password: req.body.password })
//     .then((user) => {
//       return res.json(user);
//     })
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

module.exports = router;
