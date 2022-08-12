const schedules = require('../models/schedules');

const createSchedule = (req, res) => {
  const { date, leagueId, sportId, status, teams } = req.body;

  const newSchedule = new schedules({
    date,
    leagueId,
    sportId,
    teams,
    status,
  });

  newSchedule
    .save()
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json({ err }));
};

const deleteSchedule = (req, res) => {
  const { id } = req.params;

  schedules
    .findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json({ err }));
};

const getScheduleById = (req, res) => {
  const { id } = req.params;

  schedules
    .findById(id)
    .then((schedule) => res.status(200).json(schedule))
    .catch((err) => res.status(400).json({ err }));
};

const getSchedules = (_req, res) => {
  schedules
    .find()
    .then((schedules) => res.status(200).json(schedules))
    .catch((err) => res.status(400).json({ err }));
};

// const getSchedulesByDate = (req, res) => {
//   const { date } = req.date;

//   schedules.find({ date }).then((schedules) => {
//     if (!schedules)
//   });
// };

const updateOdds = (req, res) => {
  const { id } = req.params;

  schedules
    .findById(id)
    .then((schedule) => {
      const { teams } = req.body;

      schedule.teams = teams;

      schedule
        .save()
        .then((schedule) => res.status(200).json(schedule))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};

const updateSchedule = (req, res) => {
  const { date, id, leagueId, sportId, status, teams } = req.body;

  schedules
    .findById(id)
    .then((schedule) => {
      schedule.date = date;
      schedule.leagueId = leagueId;
      schedule.sportId = sportId;
      schedule.status = status;
      schedule.teams = teams;

      schedule
        .save()
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const updateStatus = (req, res) => {
  const { id } = req.params;

  schedules
    .findById(id)
    .then((schedule) => {
      const { status } = req.body;

      schedule.status = status;

      schedule
        .save()
        .then((schedule) => res.status(200).json(schedule))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  updateOdds,
  updateSchedule,
  updateStatus,
};
