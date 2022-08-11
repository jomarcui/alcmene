const router = require('express').Router();

const { handleNewUser } = require('../controllers/registrationsController');

router.route('/').post(handleNewUser);

module.exports = router;
