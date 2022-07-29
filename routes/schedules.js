const router = require('express').Router();
let schedules = require('../models/schedules.model');

router.route('/').get((_req, res) => {
  schedules
    .find()
    .then((schedules) => res.status(200).json(schedules))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { date, leagueId, sportId, status, teams } = req.body;

  const newSchedule = new schedules({
    date,
    leagueId,
    sportId,
    teams,
    status
  });

  newSchedule
    .save()
    .then((schedule) => res.status(200).json(schedule))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  const { id } = req.params;

  schedules
    .findById(id)
    .then((schedule) => {
      const { date, leagueId, sportId, status, teams } = req.body;

      schedule.date = date;
      schedule.leagueId = leagueId;
      schedule.sportId = sportId;
      schedule.status = status;
      schedule.teams = teams;

      schedule
        .save()
        .then((schedule) => res.status(200).json(schedule))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  schedules
    .findById(id)
    .then((schedule) => res.status(200).json(schedule))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  schedules
    .findByIdAndDelete(id)
    .then((schedule) => res.status(200).json('Sport was deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
