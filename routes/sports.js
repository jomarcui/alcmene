const router = require('express').Router();
let sports = require('../models/sports.model');

router.route('/').get((_req, res) => {
  sports
    .find()
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { name } = req.body;

  const newSport = new teams({
    name,
  });

  newSport
    .save()
    .then((sport) => res.status(200).json(sport))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  const { id } = req.params;

  sports
    .findById(id)
    .then((sport) => {
      const { name } = req.body;

      sports.name = name;

      sport
        .save()
        .then((sport) => res.status(200).json(sport))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  sports
    .findById(id)
    .then((sport) => res.status(200).json(sport))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  sports
    .findByIdAndDelete(id)
    .then((sport) => res.status(200).json('Sport was deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
