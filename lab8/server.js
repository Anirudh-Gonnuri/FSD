const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve index.html and JS


let users = [];
let workouts = [];
let meals = [];

let userIdCounter = 1;
let workoutIdCounter = 1;
let mealIdCounter = 1;


app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });

  const newUser = { id: userIdCounter++, username };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/api/workouts", (req, res) => {
  res.json(workouts);
});

app.post("/api/workouts", (req, res) => {
  const { type, duration, userId } = req.body;
  if (!type || !duration || !userId)
    return res.status(400).json({ error: "Type, duration, and userId required" });

  const newWorkout = {
    id: workoutIdCounter++,
    type,
    duration,
    userId,
    date: new Date().toISOString(),
  };
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

app.get("/api/meals", (req, res) => {
  res.json(meals);
});

app.post("/api/meals", (req, res) => {
  const { name, calories, userId } = req.body;
  if (!name || !calories || !userId)
    return res.status(400).json({ error: "Name, calories, and userId required" });

  const newMeal = {
    id: mealIdCounter++,
    name,
    calories,
    userId,
    date: new Date().toISOString(),
  };
  meals.push(newMeal);
  res.status(201).json(newMeal);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
