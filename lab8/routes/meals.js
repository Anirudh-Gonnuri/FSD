const express = require("express");
const router = express.Router();

let meals = [];
let idCounter = 1;

router.get("/", (req, res) => {
  res.json(meals);
});

router.post("/", (req, res) => {
  const { name, calories } = req.body;

  if (!name || !calories) {
    return res.status(400).json({ error: "Name and calories are required" });
  }

  const newMeal = {
    id: idCounter++,
    name,
    calories,
    date: new Date().toISOString()
  };

  meals.push(newMeal);
  res.status(201).json(newMeal);
});

router.delete("/:id", (req, res) => {
  const mealId = parseInt(req.params.id, 10);
  meals = meals.filter(meal => meal.id !== mealId);
  res.json({ message: "Meal deleted", meals });
});

module.exports = router;
