const leagues = require('../models/leagues');
const schedules = require('../models/schedules');
const sports = require('../models/sports');
const teams = require('../models/teams');

const getMatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await schedules.findById(id);
    const league = await leagues.findById(schedule.leagueId);
    const sport = await sports.findById(schedule.sportId);
    const home = await teams.findById(schedule.teams.home.teamId);
    const visitor = await teams.findById(schedule.teams.visitor.teamId);

    const match = {
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
      teams: [
        {
          id: home._id,
          name: home.name,
          odds: schedule.teams.home.odds,
          side: 0
        },
        {
          id: visitor._id,
          name: visitor.name,
          odds: schedule.teams.visitor.odds,
          side: 1
        },
      ],
    };

    return res.status(200).json(match);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMatchById,
};
