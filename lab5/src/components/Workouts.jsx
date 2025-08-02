const WorkoutCard = ({ title, duration, level }) => (
  <div className="bg-white text-black p-4 rounded shadow">
    <h2 className="text-xl font-bold">{title}</h2>
    <p>Duration: {duration}</p>
    <p>Level: {level}</p>
  </div>
);

function Workouts() {
  const workouts = [
    { title: "Cardio Blast", duration: "30 mins", level: "Beginner" },
    { title: "HIIT Challenge", duration: "20 mins", level: "Intermediate" },
    { title: "Strength Training", duration: "45 mins", level: "Advanced" },
  ];

  return (
    <div className="grid gap-4 mt-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((w, i) => (
        <WorkoutCard key={i} {...w} />
      ))}
    </div>
  );
}

export default Workouts;
