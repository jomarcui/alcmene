const router = require('express').Router();
let teams = require('../models/teams.model');

router.route('/').get((_req, res) => {
  teams
    .find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { leagueId, name, sportId } = req.body;

  const newTeam = new teams({
    leagueId,
    name,
    sportId,
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
      const { leagueId, name, sportId } = req.body;

      team.leagueId = leagueId;
      team.name = name;
      team.sportId = sportId;

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
