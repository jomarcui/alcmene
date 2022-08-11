const router = require('express').Router();

const handleLogout = require('../controllers/logoutController');

router.route('/').get(handleLogout);

module.exports = router;
