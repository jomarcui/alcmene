const router = require('express').Router();

const handleRefreshToken = require('../controllers/refreshTokenController');

router.route('/').get(handleRefreshToken);

module.exports = router;
