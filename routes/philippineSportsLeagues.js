const router = require('express').Router();
let philippineSportsLleagues = require('../models/philippineSportsLeagues.model');

router.route('/').get((_req, res) => {
  philippineSportsLleagues
    .find()
    .then((philippineSportsLeague) =>
      res.status(200).json(philippineSportsLeague)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { name } = req.body;

  const newPhilippineSportsLeague = new teams({
    name,
  });

  newPhilippineSportsLeague
    .save()
    .then((philippineSportsLeague) =>
      res.status(200).json(philippineSportsLeague)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  const { id } = req.params;

  philippineSportsLleagues
    .findById(id)
    .then((philippineSportsLeague) => {
      const { name } = req.body;

      philippineSportsLeague.name = name;

      philippineSportsLeague
        .save()
        .then((philippineSportsLeague) =>
          res.status(200).json(philippineSportsLeague)
        )
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  philippineSportsLleagues
    .findById(id)
    .then((philippineSportsLeague) =>
      res.status(200).json(philippineSportsLeague)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  philippineSportsLleagues
    .findByIdAndDelete(id)
    .then((philippineSportsLeague) =>
      res.status(200).json('League was deleted.')
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
