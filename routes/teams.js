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

  const newTeam = new teams({
    league_id,
    name,
    sport_id,
  });

  newTeam
    .save()
    .then((team) => res.status(200).json(team))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  const { id } = req.params;

  teams
    .findById(id)
    .then((team) => {
      const { league_id, name, sport_id } = req.body;

      team.league_id = league_id;
      team.name = name;
      team.sport_id = sport_id;

      team
        .save()
        .then((team) => res.status(200).json(team))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  teams
    .findById(id)
    .then((team) => res.status(200).json(team))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  teams
    .findByIdAndDelete(id)
    .then((team) => res.status(200).json('Team was deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
