let userIdCounter = 1;

// Users
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;

  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });
  const data = await res.json();

  const div = document.createElement('div');
  div.className = "p-2 bg-gray-50 rounded flex justify-between items-center shadow-sm";
  div.textContent = `${data.username || username} (ID: ${data.id || userIdCounter++})`;
  userList.appendChild(div);

  userForm.reset();
});

// Workouts
const workoutForm = document.getElementById('workoutForm');
const workoutList = document.getElementById('workoutList');

workoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = document.getElementById('workoutUserId').value;
  const activity = document.getElementById('activity').value;
  const duration = document.getElementById('duration').value;

  const res = await fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: activity, duration, userId })
  });
  const data = await res.json();

  const div = document.createElement('div');
  div.className = "p-2 bg-gray-50 rounded flex justify-between items-center shadow-sm";
  div.textContent = `${data.type} (${data.duration} min) - User: ${data.userId}`;
  workoutList.appendChild(div);

  workoutForm.reset();
});

// Meals
const mealForm = document.getElementById('mealForm');
const mealList = document.getElementById('mealList');

mealForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = document.getElementById('mealUserId').value;
  const mealName = document.getElementById('mealName').value;
  const calories = document.getElementById('calories').value;

  const res = await fetch('/api/meals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: mealName, calories, userId })
  });
  const data = await res.json();

  const div = document.createElement('div');
  div.className = "p-2 bg-gray-50 rounded flex justify-between items-center shadow-sm";
  div.textContent = `${data.name} (${data.calories} cal) - User: ${data.userId}`;
  mealList.appendChild(div);

  mealForm.reset();
});
