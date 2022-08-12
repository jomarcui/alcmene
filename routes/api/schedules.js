const router = require('express').Router();
const Roles = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');

const {
  createSchedule,
  deleteSchedule,
  getLeagueSchedulesByDate,
  getScheduleById,
  getSchedules,
  updateOdds,
  updateSchedule,
  updateStatus,
} = require('../../controllers/schedulesController');

router.route('/').get(getSchedules).post(createSchedule);

router
  .route('/:id')
  .delete(deleteSchedule)
  .get(verifyRoles(Roles.ADMIN), getScheduleById)
  .put(verifyRoles(Roles.ADMIN), updateSchedule);

router.route('/:id/odds').patch(verifyRoles(Roles.ADMIN), updateOdds);
router.route('/:id/status').patch(verifyRoles(Roles.ADMIN), updateStatus);

router.route('/league/:leagueId/:date').get(getLeagueSchedulesByDate);

module.exports = router;
