const router = require('express').Router();

const { getMatchById } = require('../../controllers/matchesController');

router.route('/:id').get(getMatchById);

module.exports = router;
