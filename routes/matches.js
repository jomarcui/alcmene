const router = require('express').Router();

const leagues = require('../models/leagues.model');
const schedules = require('../models/schedules.model');
const sports = require('../models/sports.model');
const teams = require('../models/teams.model');

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await schedules.findById(id);
    const league = await leagues.findById(schedule.leagueId);
    const sport = await sports.findById(schedule.sportId);
    const home = await teams.findById(schedule.teams.home.teamId);
    const visitor = await teams.findById(schedule.teams.visitor.teamId);

    const result = {
      date: schedule.date,
      id: schedule._id,
      status: schedule.status,
      league: {
        id: league._id,
        name: league.name,
      },
      sport: {
        id: sport._id,
        name: sport.name,
      },
      teams: {
        home: {
          id: home._id,
          name: home.name,
          odds: schedule.teams.home.odds,
        },
        visitor: {
          id: visitor._id,
          name: visitor.name,
          odds: schedule.teams.visitor.odds,
        },
      },
    };

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }

  //   matches
  //     .findById(id)
  //     .then((schedule) => res.status(200).json(schedule))
  //     .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
