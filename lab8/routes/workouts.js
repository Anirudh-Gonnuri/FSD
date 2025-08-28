const express = require('express');
const router = express.Router();

let workouts = [];

router.get('/', (req, res) => {
  res.json(workouts);
});

router.post('/', (req, res) => {
  const { type, duration } = req.body;
  const workout = { id: workouts.length + 1, type, duration };
  workouts.push(workout);
  res.status(201).json(workout);
});

module.exports = router;
