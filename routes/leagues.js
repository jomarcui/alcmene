const router = require('express').Router();
let leagues = require('../models/leagues');

router.route('/').get((_req, res) => {
  leagues
    .find()
    .then((leagues) => res.status(200).json(leagues))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { initialism, name, sportsId } = req.body;

  const newLeague = new teams({
    initialism,
    name,
    sportsId,
  });

  newLeague
    .save()
    .then((league) => res.status(200).json(league))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  const { id } = req.params;

  leagues
    .findById(id)
    .then((league) => {
      const { initialism, name, sportsId } = req.body;

      league.initialism = initialism;
      league.name = name;
      league.sportsId = sportsId;

      league
        .save()
        .then((league) => res.status(200).json(league))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  leagues
    .findById(id)
    .then((league) => res.status(200).json(league))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  leagues
    .findByIdAndDelete(id)
    .then((league) => res.status(200).json('Sport was deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
